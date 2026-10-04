import { NextResponse } from "next/server";
import { checkCredentials } from "@/lib/auth";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession } from "@/lib/session";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const back = (q: string) => NextResponse.redirect(new URL(`/admin/login?${q}`, req.url), 303);
  if (!rateLimit(`login:${clientIp(req)}`, 8, 15 * 60_000)) return back("error=rate");

  const form = await req.formData();
  const user = checkCredentials(String(form.get("email") ?? ""), String(form.get("password") ?? ""));
  if (!user) return back("error=1");

  const token = await signSession({
    email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
