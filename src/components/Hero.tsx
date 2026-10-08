import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { site } from "@/data/site";

const quickLinks = [
  { label: "Events", href: "/events" },
  { label: "Locations", href: "/locations" },
  { label: "Sermons & resources", href: "/sermons" },
];

const journey = [
  { number: "01", title: "Discover", text: "Your gifts and calling" },
  { number: "02", title: "Build", text: "Wisdom and practical skills" },
  { number: "03", title: "Deploy", text: "Purposeful impact" },
];

export function Hero() {
  return (
    <section className="grain-panel relative overflow-hidden text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-paper/10 sm:-right-16 sm:-top-40 sm:h-[34rem] sm:w-[34rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-gold/20 sm:-right-4 sm:-top-28 sm:h-[27rem] sm:w-[27rem]" />
      <Container className="relative grid min-h-[min(760px,calc(100svh-4rem))] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            <span aria-hidden="true" className="h-px w-8 bg-gold-light" />
            Welcome to DBIF
          </p>
          <h1 className="mt-6 font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
            {site.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary">
              Fill out our connect card
            </Button>
            <Button href="/about" variant="ghost">
              Get to know DBIF
            </Button>
            {site.social.youtube && (
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold/50 px-5 py-2.5 text-sm font-medium text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="m9 6 10 6-10 6V6Z" />
                </svg>
                Watch us live
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-paper/15 pt-5 text-sm">
            <span className="font-medium text-paper/50">Explore</span>
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-paper/75 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/70">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mr-0">
          <div className="absolute -inset-3 rounded-[2rem] border border-paper/10" aria-hidden="true" />
          <div className="relative rounded-sm border border-paper/15 bg-paper/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
              A journey with purpose
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
              Your next chapter starts here.
            </h2>
            <ol className="mt-7">
              {journey.map((step, index) => (
                <li key={step.number} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < journey.length - 1 && (
                    <span aria-hidden="true" className="absolute left-[1.125rem] top-10 h-[calc(100%-1.5rem)] w-px bg-paper/20" />
                  )}
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ink text-xs font-semibold text-gold-light">
                    {step.number}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-display text-xl font-medium">{step.title}</h3>
                    <p className="mt-1 text-sm text-paper/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/about/ministry-focus" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold-light underline decoration-gold-light/40 underline-offset-4 hover:decoration-gold-light">
              Explore our ministry focus
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
