import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";
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

export function checkCredentials(email: string, password: string): AdminUser | null {
  const wanted = email.trim().toLowerCase();
  let match: AdminUser | null = null;
  for (const u of users()) {
    const passOk = timingSafeEqual(digest(u.password), digest(password));
    if (u.email.toLowerCase() === wanted && passOk) match = u;
  }
  return match;
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
