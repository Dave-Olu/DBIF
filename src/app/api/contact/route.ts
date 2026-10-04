import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { updateJson } from "@/lib/store";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export interface Message {
  id: string; createdAt: string; name: string; email: string; reason: string; message: string;
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REASONS = ["General enquiry", "Prayer / support request", "Event information", "Partnership enquiry", "Testimony submission", "Something else"];

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60 * 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  if (body?.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this hidden field

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const reason = REASONS.includes(body?.reason) ? body.reason : "General enquiry";
  const message = String(body?.message ?? "").trim();

  if (!name || name.length > 100) return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (message.length < 3 || message.length > 3000) return NextResponse.json({ error: "Enter a message (up to 3000 characters)." }, { status: 400 });

  const entry: Message = { id: randomUUID(), createdAt: new Date().toISOString(), name, email, reason, message };
  await updateJson<Message[]>("messages", () => [], (list) => [entry, ...list]);

  if (process.env.NOTIFY_EMAIL) {
    await sendMail({
      to: process.env.NOTIFY_EMAIL,
      subject: `[DBIF website] ${reason} from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      replyTo: email,
    });
  }
  return NextResponse.json({ ok: true });
}
