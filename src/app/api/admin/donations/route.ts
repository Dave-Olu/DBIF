import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { listDonations } from "@/lib/ledger";

// Spreadsheet apps run text starting with = + - @ as formulas; prefix a quote to neutralise it.
const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const s = await verifySession(cookies().get(SESSION_COOKIE)?.value);
  if (!s || s.role !== "super") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rows = await listDonations();
  const head = ["Reference", "Date", "Status", "Name", "Email", "Purpose", "Amount (NGN)", "Channel", "Note"];
  const lines = rows.map((d) =>
    [d.reference, d.paidAt ?? d.createdAt, d.status, d.name, d.email, d.purpose, (d.amountKobo / 100).toFixed(2), d.channel, d.note].map(cell).join(","),
  );
  return new NextResponse([head.map(cell).join(","), ...lines].join("\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="dbif-donations.csv"' },
  });
}
