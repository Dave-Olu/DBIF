import { NextResponse } from "next/server";
import { confirmPayment, isValidSignature } from "@/lib/paystack";

export async function POST(req: Request) {
  const raw = await req.text(); // signature is over the exact raw body
  if (!isValidSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  let event: { event?: string; data?: { reference?: string } };
  try { event = JSON.parse(raw); } catch { return NextResponse.json({ ok: true }); }

  if (event.event === "charge.success" && event.data?.reference) {
    try { await confirmPayment(event.data.reference); }
    catch (e) { console.error("webhook confirm failed", e); return NextResponse.json({ error: "retry" }, { status: 500 }); }
  }
  return NextResponse.json({ ok: true });
}
