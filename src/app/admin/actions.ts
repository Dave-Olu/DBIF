"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { collections, parseHttpsUrl, parseItem } from "@/lib/admin-schema";
import { getSettings, listItems, removeItem, saveSettings, upsertItem, type CollectionName, type Settings } from "@/lib/content";

const isCollection = (c: string): c is CollectionName => c in collections;
const refresh = () => revalidatePath("/", "layout");

export async function saveItemAction(fd: FormData) {
  await requireRole("editor");
  const c = String(fd.get("collection"));
  if (!isCollection(c)) redirect("/admin");
  const editing = String(fd.get("slug") ?? "") || null;
  const existing = (await listItems(c)).map((i) => i.slug);
  const parsed = parseItem(collections[c], fd, existing, editing);
  if (!parsed.ok) redirect(`/admin/${c}?error=${encodeURIComponent(parsed.error)}`);
  await upsertItem(c, parsed.item);
  refresh();
  redirect(`/admin/${c}?saved=1`);
}

export async function deleteItemAction(fd: FormData) {
  await requireRole("editor");
  const c = String(fd.get("collection"));
  if (!isCollection(c)) redirect("/admin");
  await removeItem(c, String(fd.get("slug")));
  refresh();
  redirect(`/admin/${c}?saved=1`);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveSettingsAction(fd: FormData) {
  await requireRole("editor");
  const get = (k: string) => String(fd.get(k) ?? "").trim() || null;
  const current = await getSettings();
  const next: Settings = {
    contact: { phone: get("phone"), whatsapp: get("whatsapp"), email: get("email"), address: get("address") },
    social: { facebook: get("facebook"), instagram: get("instagram"), youtube: get("youtube"), tiktok: get("tiktok"), x: get("x") },
  };
  if (next.contact.email && !EMAIL_RE.test(next.contact.email)) redirect(`/admin/contacts?error=${encodeURIComponent("Email address is not valid.")}`);
  for (const [k, v] of Object.entries(next.social)) {
    if (v && !parseHttpsUrl(v)) redirect(`/admin/contacts?error=${encodeURIComponent(`${k} must be a full link starting with https://`)}`);
  }
  void current;
  await saveSettings(next);
  refresh();
  redirect("/admin/contacts?saved=1");
}
