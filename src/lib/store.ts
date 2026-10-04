import { promises as fs } from "fs";
import path from "path";

/**
 * Minimal JSON-file store used for admin-editable content, the donations
 * ledger, and contact submissions.
 *
 * It works on any host with a persistent, writable disk (VPS, Docker volume,
 * local dev). It does NOT persist on read-only/serverless hosts such as
 * Vercel. Before deploying there, replace readJson/updateJson with a managed
 * database (Supabase/Neon per PRD §24); every caller goes through these two
 * functions, so that is the only file that has to change.
 */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");
const chains = new Map<string, Promise<unknown>>();

async function readRaw<T>(name: string): Promise<T | undefined> {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, `${name}.json`), "utf8")) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw e;
  }
}

export async function readJson<T>(name: string, seed: () => T): Promise<T> {
  return (await readRaw<T>(name)) ?? seed();
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
