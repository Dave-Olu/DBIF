import Link from "next/link";
import { requireRole } from "@/lib/auth";

export default async function AdminHome() {
  const s = await requireRole("editor");
  const cards: [string, string, string][] = [
    ["/admin/events", "Events", "Add, edit or remove events."],
    ["/admin/sermons", "Sermons & resources", "Publish teachings with audio or video links."],
    ["/admin/locations", "Locations", "Branch addresses, service times and maps."],
    ["/admin/contacts", "Contact details", "Phone, WhatsApp, email and social links."],
    ...(s.role === "super" ? ([["/admin/donations", "Donations", "View Paystack payments and export a CSV."], ["/admin/messages", "Messages", "Contact form and prayer requests."]] as [string, string, string][]) : []),
  ];
  return (
    <>
      <h1 className="font-display text-3xl font-medium text-ink">Admin dashboard</h1>
      <p className="mt-2 text-ink/60">Changes go live on the public site as soon as you save.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map(([href, title, text]) => (
          <Link key={href} href={href} className="border border-ink/12 bg-paper p-5 hover:border-gold">
            <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
            <p className="mt-1 text-sm text-ink/60">{text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
