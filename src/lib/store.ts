import { promises as fs } from "fs";
import path from "path";
import postgres from "postgres";

/**
 * Supabase Postgres is the persistent store in hosted environments. The local
 * JSON adapter remains available for development without database credentials.
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");
const chains = new Map<string, Promise<unknown>>();
let database: ReturnType<typeof postgres> | undefined;

export const getDataDirectory = () => DIR;

function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    if (process.env.VERCEL) {
      throw new Error("DATABASE_URL must be configured for persistent content on Vercel.");
    }
    return undefined;
  }
  database ??= postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    ssl: "require",
  });
  return database;
}

async function readRaw<T>(name: string): Promise<T | undefined> {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, `${name}.json`), "utf8")) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw e;
  }
}

export async function readJson<T>(name: string, seed: () => T): Promise<T> {
  const db = getDatabase();
  if (db) {
    const rows = await db<{ data: T }[]>`SELECT data FROM public.content_store WHERE key = ${name}`;
    return rows[0]?.data ?? seed();
  }
  return (await readRaw<T>(name)) ?? seed();
}

export async function readString(name: string, seed: () => string): Promise<string> {
  const db = getDatabase();
  if (db) {
    const rows = await db<{ data: unknown }[]>`SELECT data FROM public.content_store WHERE key = ${name}`;
    const value = rows[0]?.data;
    return typeof value === "string" ? value : value === undefined ? seed() : JSON.stringify(value);
  }

  let contents: string;
  try {
    contents = await fs.readFile(path.join(DIR, `${name}.json`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return seed();
    throw error;
  }

  try {
    const parsed: unknown = JSON.parse(contents);
    return typeof parsed === "string" ? parsed : contents;
  } catch (error) {
    if (error instanceof SyntaxError) return contents;
    throw error;
  }
}

/** Read-modify-write, serialised per file so concurrent requests don't clobber each other. */
export function updateJson<T>(
  name: string,
  seed: () => T,
  fn: (current: T) => T | Promise<T>,
): Promise<T> {
  const prev = chains.get(name) ?? Promise.resolve();
  const next = prev
    .catch(() => undefined)
    .then(async () => {
      const db = getDatabase();
      if (db) {
        const transactionResult = await db.begin(async (transaction) => {
          await transaction`
            INSERT INTO public.content_store (key, data)
            VALUES (${name}, ${JSON.stringify(seed())}::jsonb)
            ON CONFLICT (key) DO NOTHING
          `;
          const rows = await transaction<{ data: T }[]>`
            SELECT data FROM public.content_store WHERE key = ${name} FOR UPDATE
          `;
          const current = rows[0]?.data;
          if (current === undefined) throw new Error(`Could not load content store entry "${name}".`);
          const out = await fn(current);
          await transaction`
            UPDATE public.content_store
            SET data = ${JSON.stringify(out)}::jsonb, updated_at = now()
            WHERE key = ${name}
          `;
          return { value: out };
        });
        return transactionResult.value;
      }

      const current = (await readRaw<T>(name)) ?? seed();
      const out = await fn(current);
      await fs.mkdir(DIR, { recursive: true });
      const file = path.join(DIR, `${name}.json`);
      const tmp = `${file}.${process.pid}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(out, null, 2));
      await fs.rename(tmp, file);
      return out;
    });
  chains.set(name, next);
  return next;
}
