import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Keystone } from "@/components/Keystone";
import { site } from "@/data/site";

const quickLinks = [
  { label: "Upcoming events", href: "/events" },
  { label: "Find a location", href: "/locations" },
  { label: "Watch & listen", href: "/sermons" },
];

export function Hero() {
  return (
    <section className="grain-panel relative overflow-hidden text-paper">
      <Container className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20 sm:py-28">
        <div className="flex items-center gap-2 text-gold">
          <Keystone />
          <Keystone />
          <Keystone />
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-6xl">
          {site.tagline}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          {site.description}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Connect with us
          </Button>
          <Button href="/about" variant="ghost">
            Learn about DBIF
          </Button>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/15 pt-6 text-sm">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-paper/70 underline-offset-4 hover:text-paper hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
