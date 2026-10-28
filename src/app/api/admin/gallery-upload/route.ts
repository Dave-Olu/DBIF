import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@/lib/auth";
import { upsertGalleryImage } from "@/lib/content";
import { getDataDirectory } from "@/lib/store";
import { uploadGalleryAsset, usesRemoteGalleryStorage } from "@/lib/gallery-storage";
import type { GalleryImage } from "@/lib/types";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_REQUEST_SIZE = 4.25 * 1024 * 1024;
const CATEGORIES = new Set<GalleryImage["category"]>(["worship", "outreach", "conference", "community"]);

function imageExtension(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
      bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "webp";
  return null;
}

function redirectTo(request: NextRequest, query: string) {
  return NextResponse.redirect(new URL(`/admin/gallery?${query}`, request.url), 303);
}

export async function POST(request: NextRequest) {
  await requireRole("editor");
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_REQUEST_SIZE) return redirectTo(request, "error=Upload+request+is+too+large.");

  const formData = await request.formData();
  const file = formData.get("image");
  const alt = String(formData.get("alt") ?? "").trim();
  const category = String(formData.get("category") ?? "");

  if (!(file instanceof File) || file.size === 0) return redirectTo(request, "error=Choose+an+image+to+upload.");
  if (file.size > MAX_FILE_SIZE) return redirectTo(request, "error=Image+must+be+5+MB+or+smaller.");
  if (!alt || alt.length > 150) return redirectTo(request, "error=Enter+a+caption+of+150+characters+or+fewer.");
  if (!CATEGORIES.has(category as GalleryImage["category"])) return redirectTo(request, "error=Choose+a+valid+image+category.");

  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = imageExtension(bytes);
  if (!extension) return redirectTo(request, "error=Only+JPEG,+PNG,+and+WebP+images+are+supported.");

  const id = randomUUID();
  const filename = `${id}.${extension}`;
  const src = usesRemoteGalleryStorage()
    ? await uploadGalleryAsset(filename, bytes, `image/${extension === "jpg" ? "jpeg" : extension}`)
    : await saveLocalGalleryImage(filename, bytes);
  await upsertGalleryImage({
    id,
    src,
    alt,
    category: category as GalleryImage["category"],
  });

  return redirectTo(request, "uploaded=1");
}

async function saveLocalGalleryImage(filename: string, bytes: Uint8Array) {
  const uploadDirectory = path.join(getDataDirectory(), "uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(path.join(uploadDirectory, filename), bytes, { flag: "wx" });
  return `/api/gallery-images/${filename}`;
}
