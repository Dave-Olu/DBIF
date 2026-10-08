import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { site, organizationalHistory } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} — our story, vision, values, and leadership.`,
};

const links = [
  { href: "/about/history", label: "Our Story / History", desc: "How DBIF began, and how it became what it is today." },
  { href: "/about/vision-mission", label: "Vision & Mission", desc: "What DBIF exists to do." },
  { href: "/about/core-values", label: "Core Values", desc: "What guides how DBIF operates." },
  { href: "/about/leadership", label: "Leadership", desc: "The people leading DBIF." },
  { href: "/about/ministry-focus", label: "Ministry Focus", desc: "Leadership, Relationship, and Finance." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About DBIF"
        intro={`${site.name} is a Christian fellowship rooted in prayer, discipleship, and helping people build purposeful lives grounded in biblical truth.`}
      />
      <Container className="py-16 sm:py-20">
        <p className="max-w-2xl text-ink/70">{organizationalHistory.nameChangeReason}</p>

        <section className="mt-12 rounded border border-ink/10 bg-paper-dim p-6 sm:p-8">
          <h2 className="font-display text-3xl font-medium text-ink">Our vision</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/75">
            <p>
              DBIF seeks to help individuals discover purpose, grow in character, and live in a way that reflects God&apos;s design for family, leadership, stewardship, and community.
            </p>
            <p>
              The fellowship is built around discipleship, relationship-building, practical teaching, and service that strengthens both the individual and the body of Christ.
            </p>
          </div>
        </section>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border border-ink/12 p-6 transition-colors hover:border-gold"
            >
              <h2 className="font-display text-xl font-medium text-ink group-hover:underline">
                {link.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{link.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
