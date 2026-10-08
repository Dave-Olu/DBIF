"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logoUrl from "@/app/gallery/Logo.png";
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

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenDropdown(null);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeNavigation = () => {
    setOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={closeNavigation}>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden">
            <Image src={logoUrl} alt={`${site.name} logo`} className="object-contain" fill sizes="48px" />
          </div>
          <span className="max-w-[12rem] font-display text-sm font-semibold leading-tight tracking-tight text-ink sm:max-w-[16rem] lg:max-w-[10rem] lg:text-xs xl:max-w-none xl:whitespace-nowrap xl:text-sm">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-0 rounded-full border border-ink/10 bg-paper-dim/50 p-0.5 lg:flex xl:gap-0.5 xl:p-1">
          {desktopNavItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={closeNavigation}
                  className={cx(
                    "inline-flex items-center rounded-full px-2 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm",
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
                      aria-controls={`desktop-submenu-${item.href.slice(1).replaceAll("/", "-")}`}
                      aria-expanded={openDropdown === item.href}
                      onClick={() => setOpenDropdown((current) => current === item.href ? null : item.href)}
                      className="ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-ink/70 hover:bg-paper hover:text-ink xl:h-7 xl:w-7"
                    >
                      <svg viewBox="0 0 20 20" className={cx("h-4 w-4 transition-transform", openDropdown === item.href && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      id={`desktop-submenu-${item.href.slice(1).replaceAll("/", "-")}`}
                      hidden={openDropdown !== item.href}
                      className="absolute left-0 top-full min-w-[220px] rounded-sm border border-ink/10 bg-paper py-2 shadow-lg shadow-ink/5"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeNavigation}
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
          <div className="relative">
            <button
              type="button"
              aria-controls="desktop-submenu-more"
              aria-label="Toggle More navigation submenu"
              aria-expanded={openDropdown === "more"}
              onClick={() => setOpenDropdown((current) => current === "more" ? null : "more")}
              className={cx(
                "inline-flex items-center gap-1 rounded-full px-2 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm",
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
            <div
              id="desktop-submenu-more"
              hidden={openDropdown !== "more"}
              className="absolute left-0 top-full min-w-[190px] rounded-sm border border-ink/10 bg-paper py-2 shadow-lg shadow-ink/5"
            >
              {overflowItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeNavigation}
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
              aria-current={pathname === "/give" ? "page" : undefined}
              onClick={closeNavigation}
              className={cx(
                "inline-flex items-center rounded-full px-2 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm",
                pathname === "/give" ? "bg-forest text-paper shadow-sm" : "text-ink/70 hover:bg-paper hover:text-ink"
              )}
            >
              Give
            </Link>
          )}
        </nav>

        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          onClick={closeNavigation}
          className="hidden rounded-full bg-forest px-3 py-2 text-xs font-semibold text-paper transition-colors hover:bg-forest-dark lg:inline-block xl:px-4 xl:py-2.5 xl:text-sm"
        >
          Connect with us
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            setOpen((v) => {
              if (v) setOpenDropdown(null);
              return !v;
            });
          }}
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
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-ink/10 bg-paper lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children && (
                  <>
                    <button
                      type="button"
                      aria-controls={`mobile-submenu-${item.href.slice(1).replaceAll("/", "-")}`}
                      aria-expanded={openDropdown === item.href}
                      onClick={() => setOpenDropdown((current) => current === item.href ? null : item.href)}
                      className={cx(
                        "flex min-h-10 w-full items-center justify-between py-2 text-left text-[1.05rem]",
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "font-semibold text-forest"
                          : "text-ink"
                      )}
                    >
                      {item.label}
                      <svg viewBox="0 0 20 20" className={cx("h-4 w-4 transition-transform", openDropdown === item.href && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openDropdown === item.href && (
                      <div
                        id={`mobile-submenu-${item.href.slice(1).replaceAll("/", "-")}`}
                        className="ml-3 flex flex-col border-l border-ink/10 pl-3"
                      >
                        <Link
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={closeNavigation}
                          className="py-1.5 text-sm font-medium text-ink/80"
                        >
                          {item.label} overview
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            onClick={closeNavigation}
                            className="py-1.5 text-sm text-ink/70"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {!item.children && (
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={closeNavigation}
                    className={cx("block py-2 text-[1.05rem]", pathname === item.href ? "font-semibold text-forest" : "text-ink")}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={closeNavigation}
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
