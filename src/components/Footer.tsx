import Link from "next/link";
import Image from "next/image";
import logoUrl from "@/app/gallery/Logo.jpeg";
import { footerLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { getSettings } from "@/lib/content";

function SocialIcon({ name }: { name: string }) {
  const commonClassName = "h-4 w-4 stroke-current";

  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <path d="M14 8h2V4h-2.5C11.3 4 10 5.3 10 7.5V10H8v4h2v6h4v-6h2.5l.5-4H14V8.8c0-.4.3-.8.8-.8H16V8h-2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <path d="M20 12c0-1.4-.2-2.6-.7-3.4-.6-1.1-1.7-1.6-3.6-1.8C14.7 6.6 13.4 6.5 12 6.5s-2.7.1-3.7.3c-1.9.2-3 .7-3.6 1.8C4.2 9.4 4 10.6 4 12s.2 2.6.7 3.4c.6 1.1 1.7 1.6 3.6 1.8 1 .2 2.3.3 3.7.3s2.7-.1 3.7-.3c1.9-.2 3-.7 3.6-1.8.5-.8.7-2 .7-3.4Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <path d="M14 4c.7 1.7 2.1 2.8 4 3.2v2.8c-1.4 0-2.6-.4-3.7-1.2v5.4c0 2.5-2 4.5-4.5 4.5S5.3 16.5 5.3 14s2-4.5 4.5-4.5c.4 0 .8 0 1.2.1v2.9c-.4-.1-.8-.1-1.2-.1-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8V4h6Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <path d="M5 4.5 10.2 12l-5.2 7.5h2.8l4.1-5.8 4.1 5.8h5.1L13.9 12l5.1-7.5h-2.8l-4.1 5.8-4.1-5.8H5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={commonClassName} aria-hidden="true">
          <path d="M7.5 17.5 5.8 19.2a.8.8 0 0 1-1.3-.6V17c-1.2-1.7-1.7-3.7-1.7-5.8A8.5 8.5 0 0 1 11.3 2.5a8.5 8.5 0 0 1 8.2 8.2c0 4.8-4.1 8.8-9 8.8h-.1c-1.1 0-2.1-.3-3-.7l-1.1-.5Zm8.8-8.6c-.2-1.1-1.2-1.7-2.4-1.9-.5-.1-1-.1-1.3-.1-1.1 0-1.8.3-2.4.9-.7.8-.9 1.6-.9 2.8 0 .8.2 1.7.6 2.6l.4.9-.6 1.9 1.9-.5.8.4c1.1.6 2.1.8 3.2.8 1.1 0 2-.3 2.7-.9.9-.8 1.2-1.8 1.1-3.1-.1-1-.8-1.7-1.9-2.1Zm-2.6 5.9c-.8 0-1.5-.2-2.1-.7l-.2-.1-.9.2-.7-1.5.5-.8-.1-.2c-.5-1-.5-2.2.2-3.1.6-.8 1.6-1.1 2.8-1.1.9 0 1.8.2 2.6.7.8.5 1.3 1.2 1.5 2.1.1.7 0 1.5-.4 2.2-.5.9-1.4 1.4-2.5 1.7l-.2.1-.1 0Z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return <span className="text-[10px] font-semibold uppercase tracking-wide">{name.slice(0, 1)}</span>;
  }
}

export async function Footer() {
  const { contact, social } = await getSettings();
  const socials = Object.entries(social).filter(([, v]) => v) as [string, string][];
  const socialLinks = [...(contact.whatsapp ? ([["whatsapp", contact.whatsapp]] as [string, string][]) : []), ...socials];

  return (
    <footer className="grain-panel text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <Image src={logoUrl} alt={`${site.name} logo`} className="h-10 w-auto object-contain" />
            <span className="font-display text-lg font-semibold">{site.shortName}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
            {site.description}
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-medium">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-medium">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-paper">
                  {contact.email}
                </a>
              ) : (
                "Email — to be confirmed"
              )}
            </li>
            <li>
              <a href={`https://wa.me/${contact.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                {contact.phone ?? ""}
              </a>
            </li>
            <li className="flex items-center gap-3 pt-1">
              {socialLinks.map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper transition-colors hover:border-paper/40 hover:text-paper"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-paper/80">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
