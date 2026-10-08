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
      <PageHeader title="Our Story" intro="A fellowship shaped by prayer, discipleship, and a vision to build people for purpose." />
      <Container narrow className="prose-content py-16 sm:py-20">
        <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink/80">
          <p>
            {site.name} ({site.shortName}) is a Christian fellowship and ministry established in {site.foundedYear}. It grew from a vision to help believers discover purpose, strengthen character, and live with practical wisdom in every area of life.
          </p>
          <p>
            Its early work centered on prayer, teaching, fellowship, and building relationships across families, individuals, and communities. Over time, the ministry widened into leadership development, relationship guidance, financial stewardship, and outreach activities that continue to shape its identity today.
          </p>
          <p>{organizationalHistory.expansionNote}</p>

          <h2 className="pt-4 font-display text-2xl font-medium text-ink">
            From {site.formerName} to {site.shortName}
          </h2>
          <p>{organizationalHistory.nameChangeReason}</p>

          <h2 className="pt-4 font-display text-2xl font-medium text-ink">Our biblical foundation</h2>
          <p className="text-ink/70">
            DBIF believes God is still shaping people for purpose, restoration, and service. The ministry is grounded in Scripture and seeks to help people grow spiritually, relationally, and practically.
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
