const BUCKET = "gallery";
const FILE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

function storageConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    if (url || key || process.env.VERCEL || process.env.DATABASE_URL) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for persistent gallery uploads.");
    }
    return null;
  }
  return { url: url.replace(/\/+$/, ""), key };
}

export function usesRemoteGalleryStorage() {
  return Boolean(storageConfig());
}

export function assertGalleryStorageConfigured() {
  storageConfig();
}

export async function uploadGalleryAsset(filename: string, bytes: Uint8Array, contentType: string): Promise<string> {
  const config = storageConfig();
  if (!config) throw new Error("Supabase gallery storage is not configured.");

  const response = await fetch(`${config.url}/storage/v1/object/${BUCKET}/${filename}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": contentType,
      "x-upsert": "false",
    },
    body: Buffer.from(bytes),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gallery image upload failed (${response.status}): ${details}`);
  }
  return `${config.url}/storage/v1/object/public/${BUCKET}/${filename}`;
}

export async function deleteGalleryAsset(src: string) {
  const config = storageConfig();
  if (!config) return false;

  const prefix = `${config.url}/storage/v1/object/public/${BUCKET}/`;
  if (!src.startsWith(prefix)) return false;
  const filename = src.slice(prefix.length);
  if (!FILE_PATTERN.test(filename)) return false;

  const response = await fetch(`${config.url}/storage/v1/object/${BUCKET}`, {
    method: "DELETE",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefixes: [filename] }),
  });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Gallery image deletion failed (${response.status}): ${details}`);
  }
  return true;
}

export function galleryContentType(filename: string) {
  const extension = filename.split(".").pop();
  if (extension === "jpg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  return null;
}
