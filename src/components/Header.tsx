"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoUrl from "@/app/gallery/Logo.jpeg";
import { primaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import { Container } from "@/components/Container";
import { cx } from "@/lib/utils";

export function Header({ showGive = false }: { showGive?: boolean }) {
  const pathname = usePathname();
  const navItems: typeof primaryNav = showGive ? [...primaryNav, { label: "Give", href: "/give" }] : primaryNav;
  const overflowHrefs = ["/testimonies", "/gallery", "/partnerships"];
  const desktopNavItems = navItems.filter((item) => !overflowHrefs.includes(item.href) && item.href !== "/contact" && item.href !== "/give");
  const overflowItems = navItems.filter((item) => overflowHrefs.includes(item.href));
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logoUrl.src} alt={`${site.name} logo`} className="h-9 w-auto object-contain" />
          <span className="max-w-[12rem] font-display text-sm font-semibold leading-tight tracking-tight text-ink sm:max-w-[16rem] lg:max-w-none lg:whitespace-nowrap lg:text-xs xl:text-sm">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full border border-ink/10 bg-paper-dim/50 p-1 lg:flex">
          {desktopNavItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cx(
                    "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-forest text-paper shadow-sm"
                      : "text-ink/70 hover:bg-paper hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <>
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={openDropdown === item.href}
                      onClick={() => setOpenDropdown((current) => current === item.href ? null : item.href)}
                      className="ml-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-paper hover:text-ink"
                    >
                      <svg viewBox="0 0 20 20" className={cx("h-4 w-4 transition-transform", openDropdown === item.href && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className={cx(
                      "invisible absolute left-0 top-full min-w-[220px] rounded-sm border border-ink/10 bg-paper py-2 opacity-0 shadow-lg shadow-ink/5 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                      openDropdown === item.href && "visible opacity-100"
                    )}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-ink/75 hover:bg-paper-dim hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
          <div className="group relative">
            <button
              type="button"
              aria-expanded={openDropdown === "more"}
              onClick={() => setOpenDropdown((current) => current === "more" ? null : "more")}
              className={cx(
                "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                overflowItems.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"))
                  ? "bg-forest text-paper shadow-sm"
                  : "text-ink/70 hover:bg-paper hover:text-ink"
              )}
            >
              More
              <svg viewBox="0 0 20 20" className={cx("h-4 w-4 transition-transform", openDropdown === "more" && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={cx(
              "invisible absolute left-0 top-full min-w-[190px] rounded-sm border border-ink/10 bg-paper py-2 opacity-0 shadow-lg shadow-ink/5 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
              openDropdown === "more" && "visible opacity-100"
            )}>
              {overflowItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-ink/75 hover:bg-paper-dim hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {showGive && (
            <Link
              href="/give"
              className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-paper hover:text-ink"
            >
              Give
            </Link>
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-dark lg:inline-block"
        >
          Connect with us
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            {open ? (
              <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" className="border-t border-ink/10 bg-paper lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block flex-1 py-2 text-[1.05rem] text-ink"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={openDropdown === item.href}
                    onClick={() => setOpenDropdown((current) => current === item.href ? null : item.href)}
                    className="flex h-10 w-10 items-center justify-center text-ink/70"
                  >
                    <svg viewBox="0 0 20 20" className={cx("h-4 w-4 transition-transform", openDropdown === item.href && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                      <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                </div>
                {item.children && (
                  <div className={cx("ml-3 flex flex-col border-l border-ink/10 pl-3", openDropdown !== item.href && "hidden")}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="py-1.5 text-sm text-ink/70"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-sm bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper"
            >
              Connect with us
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
