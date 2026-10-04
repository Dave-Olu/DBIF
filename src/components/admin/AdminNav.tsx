import Link from "next/link";
import type { Session } from "@/lib/session";

export function AdminNav({ session }: { session: Session }) {
  const links: [string, string][] = [
    ["/admin", "Dashboard"], ["/admin/events", "Events"], ["/admin/sermons", "Sermons"],
    ["/admin/locations", "Locations"], ["/admin/contacts", "Contact details"],
    ...(session.role === "super" ? ([["/admin/donations", "Donations"], ["/admin/messages", "Messages"]] as [string, string][]) : []),
  ];
  return (
    <div className="border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 text-sm sm:px-8">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="text-ink/70 hover:text-ink">{label}</Link>
        ))}
        <span className="ml-auto text-ink/50">{session.email} ({session.role === "super" ? "super admin" : "editor"})</span>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="underline underline-offset-2 hover:text-ink">Sign out</button>
        </form>
      </div>
    </div>
  );
}
