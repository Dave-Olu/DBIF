import Link from "next/link";
import { requireRole } from "@/lib/auth";

export default async function AdminHome() {
  const session = await requireRole("editor");
  const contentCards = [
    { href: "/admin/events", title: "Events", description: "Create and update upcoming events.", label: "01" },
    { href: "/admin/sermons", title: "Sermons & resources", description: "Publish teachings and media links.", label: "02" },
    { href: "/admin/locations", title: "Locations", description: "Manage branch details and service times.", label: "03" },
    { href: "/admin/gallery", title: "Gallery", description: "Upload, edit, or remove gallery images.", label: "04" },
    { href: "/admin/announcement", title: "Announcement", description: "Update the message at the top of the site.", label: "05" },
    { href: "/admin/contacts", title: "Contact details", description: "Manage public contact and social links.", label: "06" },
  ];
  const operationsCards = session.role === "super"
    ? [
        { href: "/admin/donations", title: "Donations", description: "Review payments and export a report.", label: "01" },
        { href: "/admin/messages", title: "Messages", description: "Review contact form and prayer requests.", label: "02" },
      ]
    : [];
  const cardClass = "group flex min-h-36 items-start gap-4 rounded-sm border border-ink/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-md focus-visible:border-gold";
  const cards = (items: typeof contentCards) => items.map(({ href, title, description, label }) => (
    <Link key={href} href={href} className={cardClass}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-paper-dim font-display text-sm text-forest">{label}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg font-medium text-ink">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink/60">{description}</span>
      </span>
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-1 h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-forest" aria-hidden="true">
        <path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  ));

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-sm bg-ink px-6 py-8 text-paper sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-paper/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-paper/10" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">DBIF content studio</p>
        <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Welcome to your dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/70 sm:text-base">
          Manage the content your community sees. Your saved updates are reflected on the public website.
        </p>
      </section>

      <section aria-labelledby="content-tools-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Website</p>
            <h2 id="content-tools-heading" className="mt-1 font-display text-2xl font-medium text-ink">Content management</h2>
          </div>
          <span className="text-sm text-ink/50">{contentCards.length} tools</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{cards(contentCards)}</div>
      </section>

      {operationsCards.length > 0 && (
        <section aria-labelledby="operations-heading">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Administration</p>
            <h2 id="operations-heading" className="mt-1 font-display text-2xl font-medium text-ink">Operations</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">{cards(operationsCards)}</div>
        </section>
      )}
    </div>
  );
}
