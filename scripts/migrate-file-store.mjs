import { promises as fs } from "node:fs";
import path from "node:path";
import postgres from "postgres";

const root = process.cwd();
const overwrite = process.argv.includes("--overwrite");
const dataDirectory = path.resolve(root, process.env.DATA_DIR || ".data");
const bucket = "gallery";

function loadLocalEnv() {
  const file = path.join(root, ".env.local");
  return fs.readFile(file, "utf8").then((contents) => {
    for (const line of contents.split(/\r?\n/)) {
      const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
      if (!match || process.env[match[1]] !== undefined) continue;
      let value = match[2].trim();
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      else if (value.startsWith('"') && value.endsWith('"')) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value.slice(1, -1);
        }
      }
      process.env[match[1]] = value;
    }
  }).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
}

await loadLocalEnv();

const databaseUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!databaseUrl || !supabaseUrl || !serviceKey) {
  throw new Error("Set DATABASE_URL, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY before migrating.");
}

const sql = postgres(databaseUrl, { max: 1, prepare: false, ssl: "require" });

async function uploadLocalImage(filename) {
  const bytes = await fs.readFile(path.join(dataDirectory, "uploads", filename));
  const extension = path.extname(filename).slice(1);
  const contentType = extension === "jpg" ? "image/jpeg" : `image/${extension}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${filename}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: bytes,
  });
  if (!response.ok) {
    throw new Error(`Could not upload ${filename} (${response.status}): ${await response.text()}`);
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filename}`;
}

try {
  const files = (await fs.readdir(dataDirectory)).filter((file) => /^[a-zA-Z0-9_-]+\.json$/.test(file));
  let migrated = 0;
  for (const file of files) {
    const key = path.basename(file, ".json");
    const raw = await fs.readFile(path.join(dataDirectory, file), "utf8");
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      data = raw;
    }

    if (key === "gallery" && Array.isArray(data)) {
      data = await Promise.all(data.map(async (image) => {
        if (typeof image.src !== "string" || !image.src.startsWith("/api/gallery-images/")) return image;
        const filename = image.src.slice("/api/gallery-images/".length);
        if (!/^[0-9a-f-]+\.(jpg|png|webp)$/.test(filename)) {
          throw new Error(`Unexpected local gallery image path in ${file}.`);
        }
        return { ...image, src: await uploadLocalImage(filename) };
      }));
    }

    await sql.begin(async (transaction) => {
      if (overwrite) {
        await transaction`
          INSERT INTO public.content_store (key, data)
          VALUES (${key}, ${JSON.stringify(data)}::jsonb)
          ON CONFLICT (key) DO UPDATE SET data = excluded.data, updated_at = now()
        `;
      } else {
        await transaction`
          INSERT INTO public.content_store (key, data)
          VALUES (${key}, ${JSON.stringify(data)}::jsonb)
          ON CONFLICT (key) DO NOTHING
        `;
      }
    });
    migrated += 1;
    console.log(`Migrated ${key}`);
  }

  console.log(`Finished. ${migrated} data files processed${overwrite ? " (existing database values overwritten)" : " (existing database values kept)"}.`);
} finally {
  await sql.end();
}
