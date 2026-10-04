import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { SermonListItem } from "@/components/SermonListItem";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sermons & Resources",
  description: "Teaching and resources from DBIF, organized by focus area.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();
  return (
    <>
      <PageHeader
        title="Sermons & Resources"
        intro="Teaching across Leadership, Relationship, Finance, and DBIF's broader biblical foundation."
      />
      <Container narrow className="py-16 sm:py-20">
        <div>
          {sermons.map((sermon) => (
            <SermonListItem key={sermon.slug} sermon={sermon} />
          ))}
        </div>
      </Container>
    </>
  );
}
