import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";
import { SESSION_COOKIE, verifySession, type Role, type Session } from "@/lib/session";

interface AdminUser {
  email: string;
  password: string;
  role: Role;
}

/**
 * Admin users come from the ADMIN_USERS env var (JSON array):
 * [{"email":"a@b.com","password":"...","role":"super"},{"email":"c@d.com","password":"...","role":"editor"}]
 * Adding or removing an admin = edit the env var and restart. A user-management
 * screen needs a database (see store.ts).
 */
function users(): AdminUser[] {
  try {
    const list = JSON.parse(process.env.ADMIN_USERS || "[]");
    return Array.isArray(list)
      ? list.filter((u) => u?.email && u?.password && (u.role === "editor" || u.role === "super"))
      : [];
  } catch {
    return [];
  }
}

const digest = (s: string) => createHash("sha256").update(s).digest();

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    diff |= left ^ right;
  }
  return diff === 0;
}

export function checkCredentials(email: string, password: string): AdminUser | null {
  const wanted = email.trim().toLowerCase();
  const supplied = digest(password);
  for (const u of users()) {
    const expected = digest(u.password);
    if (u.email.toLowerCase() === wanted && constantTimeEqual(new Uint8Array(expected), new Uint8Array(supplied))) return u;
  }
  return null;
}

export async function getSession(): Promise<Session | null> {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}

/** Use at the top of every admin page and server action, not just in middleware. */
export async function requireRole(role: Role = "editor"): Promise<Session> {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  if (role === "super" && s.role !== "super") redirect("/admin");
  return s;
}
