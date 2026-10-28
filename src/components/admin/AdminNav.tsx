"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "@/lib/session";

export function AdminNav({ session }: { session: Session }) {
  const pathname = usePathname();
  const links: [string, string][] = [
    ["/admin", "Dashboard"], ["/admin/events", "Events"], ["/admin/sermons", "Sermons"],
    ["/admin/locations", "Locations"], ["/admin/announcement", "Announcement"],
    ["/admin/gallery", "Gallery"], ["/admin/contacts", "Contact details"],
    ...(session.role === "super" ? ([["/admin/donations", "Donations"], ["/admin/messages", "Messages"]] as [string, string][]) : []),
  ];
  return (
    <div className="border-y border-ink/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Admin workspace</span>
          <div className="flex items-center gap-3 text-xs text-ink/60">
            <span className="max-w-[13rem] truncate sm:max-w-none">{session.email}</span>
            <span className="rounded-full bg-paper-dim px-2.5 py-1 font-medium text-ink/70">
              {session.role === "super" ? "Super admin" : "Editor"}
            </span>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="font-medium text-ink/70 underline underline-offset-2 hover:text-ink">Sign out</button>
            </form>
          </div>
        </div>
        <nav aria-label="Admin navigation" className="-mx-1 flex gap-1 overflow-x-auto pb-0.5 text-sm">
          {links.map(([href, label]) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
            return (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`shrink-0 rounded-sm px-3 py-2 font-medium transition-colors ${
                  active ? "bg-ink text-paper" : "text-ink/65 hover:bg-paper-dim hover:text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
