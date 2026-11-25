"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { requireRole } from "@/lib/auth";
import { collections, parseHttpsUrl, parseItem } from "@/lib/admin-schema";
import { getGalleryImages, listItems, removeGalleryImage, removeItem, saveAnnouncement, saveSettings, upsertGalleryImage, upsertItem, type CollectionName, type Settings } from "@/lib/content";
import { describeStoreError, getDataDirectory } from "@/lib/store";
import type { GalleryImage } from "@/lib/types";
import { assertGalleryStorageConfigured, deleteGalleryAsset, uploadGalleryAsset, usesRemoteGalleryStorage } from "@/lib/gallery-storage";

const isCollection = (c: string): c is CollectionName => c in collections;
const refresh = () => revalidatePath("/", "layout");
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

function imageExtension(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
      bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "webp";
  return null;
}

async function saveEventPoster(file: File): Promise<string> {
  if (file.size > MAX_IMAGE_SIZE) throw new Error("Event image must be 4 MB or smaller.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = imageExtension(bytes);
  if (!extension) throw new Error("Only JPEG, PNG, and WebP event images are supported.");
  const filename = `${randomUUID()}.${extension}`;
  if (usesRemoteGalleryStorage()) {
    return uploadGalleryAsset(filename, bytes, `image/${extension === "jpg" ? "jpeg" : extension}`);
  }
  const uploadDirectory = path.join(getDataDirectory(), "uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(path.join(uploadDirectory, filename), bytes, { flag: "wx" });
  return `/api/gallery-images/${filename}`;
}

export async function saveItemAction(fd: FormData) {
  await requireRole("editor");
  const c = String(fd.get("collection"));
  if (!isCollection(c)) redirect("/admin");
  let existing: string[];
  let existingItems: Awaited<ReturnType<typeof listItems>> = [];
  try {
    existingItems = await listItems(c);
    existing = existingItems.map((i) => i.slug);
  } catch (error) {
    redirect(`/admin/${c}?error=${encodeURIComponent(describeStoreError(error))}`);
  }
  const editing = String(fd.get("slug") ?? "") || null;
  const parsed = parseItem(collections[c], fd, existing, editing);
  if (!parsed.ok) redirect(`/admin/${c}?error=${encodeURIComponent(parsed.error)}`);
  try {
    const posterFile = c === "events" ? fd.get("posterUrl") : null;
    let posterUrl: unknown = parsed.item.posterUrl;
    if (posterFile instanceof File && posterFile.size > 0) {
      posterUrl = await saveEventPoster(posterFile);
    } else if (c === "events" && editing) {
      posterUrl = existingItems.find((item) => item.slug === editing)?.posterUrl ?? null;
    }
    const nextItem = c === "events" ? { ...parsed.item, posterUrl } : parsed.item;
    await upsertItem(c, nextItem);
    if (c === "events" && posterFile instanceof File && posterFile.size > 0 && typeof posterUrl === "string") {
      const oldPoster = editing ? existingItems.find((item) => item.slug === editing)?.posterUrl : null;
      if (typeof oldPoster === "string" && oldPoster !== posterUrl) {
        void deleteGalleryAsset(oldPoster).catch(() => undefined);
        if (oldPoster.startsWith("/api/gallery-images/")) {
          const filename = oldPoster.slice("/api/gallery-images/".length);
          if (/^[0-9a-f-]+\.(jpg|png|webp)$/.test(filename)) {
            fs.unlink(path.join(getDataDirectory(), "uploads", filename)).catch(() => undefined);
          }
        }
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (c === "events" && (/Event image|JPEG|PNG|WebP|upload failed/i.test(message))) {
      redirect(`/admin/${c}?error=${encodeURIComponent(message)}`);
    }
    redirect(`/admin/${c}?error=${encodeURIComponent(describeStoreError(error))}`);
  }
  refresh();
  redirect(`/admin/${c}?saved=1`);
}

export async function deleteItemAction(fd: FormData) {
  await requireRole("editor");
  const c = String(fd.get("collection"));
  if (!isCollection(c)) redirect("/admin");
  if (c === "events") {
    const slug = String(fd.get("slug"));
    const item = (await listItems(c)).find((entry) => entry.slug === slug);
    const posterUrl = item?.posterUrl;
    if (typeof posterUrl === "string") {
      void deleteGalleryAsset(posterUrl).catch(() => undefined);
      if (posterUrl.startsWith("/api/gallery-images/")) {
        const filename = posterUrl.slice("/api/gallery-images/".length);
        if (/^[0-9a-f-]+\.(jpg|png|webp)$/.test(filename)) {
          fs.unlink(path.join(getDataDirectory(), "uploads", filename)).catch(() => undefined);
        }
      }
    }
  }
  await removeItem(c, String(fd.get("slug")));
  refresh();
  redirect(`/admin/${c}?saved=1`);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveSettingsAction(fd: FormData) {
  await requireRole("editor");
  const get = (k: string) => String(fd.get(k) ?? "").trim() || null;
  const next: Settings = {
    contact: { phone: get("phone"), whatsapp: get("whatsapp"), email: get("email"), address: get("address") },
    social: {
      facebookGroup: get("facebookGroup"),
      facebookPage: get("facebookPage"),
      instagram: get("instagram"),
      youtube: get("youtube"),
      tiktok: get("tiktok"),
      x: get("x"),
    },
  };
  if (next.contact.email && !EMAIL_RE.test(next.contact.email)) redirect(`/admin/contacts?error=${encodeURIComponent("Email address is not valid.")}`);
  for (const [k, v] of Object.entries(next.social)) {
    if (v && !parseHttpsUrl(v)) redirect(`/admin/contacts?error=${encodeURIComponent(`${k} must be a full link starting with https://`)}`);
  }
  await saveSettings(next);
  refresh();
  redirect("/admin/contacts?saved=1");
}

export async function saveAnnouncementAction(fd: FormData) {
  await requireRole("editor");
  const announcement = String(fd.get("announcement") ?? "").trim();
  if (announcement.length > 300) {
    redirect(`/admin/announcement?error=${encodeURIComponent("Announcement must be 300 characters or fewer.")}`);
  }
  await saveAnnouncement(announcement);
  refresh();
  redirect("/admin/announcement?saved=1");
}

export async function deleteGalleryImageAction(fd: FormData) {
  await requireRole("editor");
  const id = String(fd.get("id") ?? "");
  const image = (await getGalleryImages()).find((entry) => entry.id === id);
  if (!image) redirect(`/admin/gallery?error=${encodeURIComponent("Image was not found.")}`);
  assertGalleryStorageConfigured();
  await removeGalleryImage(id);

  const removedRemoteAsset = await deleteGalleryAsset(image.src);
  const filename = image.src.startsWith("/api/gallery-images/") ? image.src.slice("/api/gallery-images/".length) : "";
  if (!removedRemoteAsset && filename && /^[0-9a-f-]+\.(png|jpg|webp)$/.test(filename)) {
    try {
      await fs.unlink(path.join(getDataDirectory(), "uploads", filename));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  revalidatePath("/gallery");
  redirect("/admin/gallery?saved=1");
}

const GALLERY_CATEGORIES = ["worship", "outreach", "conference", "community"] as const;
const isGalleryCategory = (category: string): category is GalleryImage["category"] =>
  GALLERY_CATEGORIES.some((value) => value === category);

export async function saveGalleryImageAction(fd: FormData) {
  await requireRole("editor");
  const id = String(fd.get("id") ?? "");
  const alt = String(fd.get("alt") ?? "").trim();
  const category = String(fd.get("category") ?? "");
  const image = (await getGalleryImages()).find((entry) => entry.id === id);

  if (!image) redirect(`/admin/gallery?error=${encodeURIComponent("Image was not found.")}`);
  if (!alt || alt.length > 150) {
    redirect(`/admin/gallery?error=${encodeURIComponent("Enter a caption of 150 characters or fewer.")}`);
  }
  if (!isGalleryCategory(category)) {
    redirect(`/admin/gallery?error=${encodeURIComponent("Choose a valid image category.")}`);
  }

  await upsertGalleryImage({ ...image, alt, category });
  revalidatePath("/gallery");
  redirect("/admin/gallery?updated=1");
}
