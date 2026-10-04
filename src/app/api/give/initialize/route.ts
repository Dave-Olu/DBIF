import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { addDonation, patchDonation } from "@/lib/ledger";
import { givingEnabled, initializeTransaction } from "@/lib/paystack";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { givingPurposes, site } from "@/data/site";

const MIN_NAIRA = 100;
const MAX_NAIRA = 10_000_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!givingEnabled()) return NextResponse.json({ error: "Online giving is not available yet." }, { status: 403 });
  if (!rateLimit(`give:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a few minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const purpose = String(body?.purpose ?? givingPurposes[0]);
  const naira = Number(body?.amount);

  if (!EMAIL_RE.test(email) || email.length > 200) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!givingPurposes.includes(purpose)) return NextResponse.json({ error: "Choose a valid purpose." }, { status: 400 });
  if (!Number.isFinite(naira) || naira < MIN_NAIRA || naira > MAX_NAIRA) {
    return NextResponse.json({ error: `Amount must be between ₦${MIN_NAIRA.toLocaleString()} and ₦${MAX_NAIRA.toLocaleString()}.` }, { status: 400 });
  }

  const amountKobo = Math.round(naira * 100);
  const reference = `dbif_${randomBytes(12).toString("hex")}`;

  await addDonation({
    reference, name: name || null, email, purpose, amountKobo, currency: "NGN",
    status: "pending", createdAt: new Date().toISOString(),
  });

  try {
    const url = await initializeTransaction({
      email, amountKobo, reference,
      callbackUrl: `${site.url}/give/thank-you`,
      metadata: { name, purpose },
    });
    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    await patchDonation(reference, (d) => ({ ...d, status: "failed", note: "Could not start checkout" }));
    return NextResponse.json({ error: "We could not start the payment. Please try again." }, { status: 502 });
  }
}
