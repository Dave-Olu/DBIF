import { createHmac, timingSafeEqual } from "crypto";
import { getDonation, patchDonation, type Donation } from "@/lib/ledger";
import { sendMail } from "@/lib/mail";
import { formatNaira } from "@/lib/utils";
import { site } from "@/data/site";

const BASE = process.env.PAYSTACK_API_BASE || "https://api.paystack.co";

function secretKey(): string {
  const k = process.env.PAYSTACK_SECRET_KEY;
  if (!k) throw new Error("PAYSTACK_SECRET_KEY is not set");
  return k;
}

export const givingEnabled = () => process.env.GIVING_ENABLED === "true";

export async function initializeTransaction(input: {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
}): Promise<string> {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email,
      amount: input.amountKobo,
      currency: "NGN",
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.status || !json?.data?.authorization_url) {
    throw new Error(`Paystack initialize failed: ${json?.message ?? res.status}`);
  }
  return json.data.authorization_url as string;
}

interface VerifyData {
  status: string;
  amount: number;
  currency: string;
  channel?: string;
}

async function verifyTransaction(reference: string): Promise<VerifyData> {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey()}` },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.status || !json?.data) throw new Error(`Paystack verify failed: ${json?.message ?? res.status}`);
  return json.data as VerifyData;
}

/** True only if `signature` is the HMAC-SHA512 of the raw body under our secret key. */
export function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = createHmac("sha512", secretKey()).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * The single place a payment becomes "success". Used by both the webhook and
 * the return page, so it is idempotent: confirming twice records and emails once.
 * A payment counts only if Paystack says success AND amount/currency match what we asked for.
 */
export async function confirmPayment(reference: string): Promise<Donation | null> {
  const existing = await getDonation(reference);
  if (!existing) return null;
  if (existing.status !== "pending") return existing;

  const data = await verifyTransaction(reference);
  let next: (d: Donation) => Donation;

  if (data.status === "success") {
    const matches = data.amount === existing.amountKobo && data.currency === existing.currency;
    next = matches
      ? (d) => ({ ...d, status: "success", channel: data.channel, paidAt: new Date().toISOString() })
      : (d) => ({ ...d, status: "failed", note: "Amount or currency did not match the request" });
  } else if (["failed", "abandoned", "reversed"].includes(data.status)) {
    next = (d) => ({ ...d, status: "failed", note: `Paystack status: ${data.status}` });
  } else {
    return existing; // still processing; leave pending
  }

  const patched = await patchDonation(reference, (d) => (d.status === "pending" ? next(d) : d));
  if (!patched) return existing;
  if (patched.before === "pending" && patched.record.status === "success") {
    await sendReceipt(patched.record);
  }
  return patched.record;
}

async function sendReceipt(d: Donation) {
  await sendMail({
    to: d.email,
    subject: `Thank you for your gift to ${site.shortName}`,
    text: [
      `Dear ${d.name || "friend"},`,
      "",
      `Thank you. We received your gift of ${formatNaira(d.amountKobo)} (${d.purpose}).`,
      `Reference: ${d.reference}`,
      "",
      site.name,
    ].join("\n"),
  });
  if (process.env.NOTIFY_EMAIL) {
    await sendMail({
      to: process.env.NOTIFY_EMAIL,
      subject: `New gift: ${formatNaira(d.amountKobo)} (${d.purpose})`,
      text: `${d.name || "Anonymous"} <${d.email}>\nReference: ${d.reference}`,
    });
  }
}
