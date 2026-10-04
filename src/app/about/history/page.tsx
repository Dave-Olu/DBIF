import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { site, organizationalHistory, biblicalFoundation } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The history of ${site.name}, from its beginnings as The Visionaries International Fellowship to today.`,
};

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="Our Story" intro="From a handful of prayer meetings to a growing fellowship." />
      <Container narrow className="prose-content py-16 sm:py-20">
        <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink/80">
          <p>
            {site.name} ({site.shortName}) is a Christian fellowship and ministry established in{" "}
            {site.foundedYear}. It began from small prayer gatherings in Lagos and has grown into a
            ministry with physical presence across Southwestern Nigeria and Kwara State, together
            with an online audience across Nigeria and the international diaspora.
          </p>
          <p>
            The ministry&apos;s early activities included prayer meetings, fasting, teachings,
            marriage-focused support, leadership development, and fellowship among singles, young
            professionals, married people, youths, and children. Larger vigils and gatherings
            subsequently led to the formation of WhatsApp communities and expansion into additional
            locations.
          </p>
          <p>{organizationalHistory.expansionNote}</p>

          <h2 className="pt-4 font-display text-2xl font-medium text-ink">
            From {site.formerName} to {site.shortName}
          </h2>
          <p>{organizationalHistory.nameChangeReason}</p>

          <h2 className="pt-4 font-display text-2xl font-medium text-ink">Our biblical foundation</h2>
          <p className="text-ink/70">
            DBIF&apos;s name reflects its conviction that people can be helped, developed, and
            equipped to fulfil their God-given destinies — grounded in two foundational Bible
            passages approved by leadership.
          </p>
          <div className="mt-4 space-y-4">
            {biblicalFoundation.passages.map((passage) => (
              <blockquote key={passage.reference} className="rounded border border-ink/10 bg-paper-dim p-4">
                <p className="font-display text-lg font-medium text-ink">{passage.reference}</p>
                <p className="mt-2 text-base italic leading-relaxed text-ink/80">“{passage.text}”</p>
              </blockquote>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
