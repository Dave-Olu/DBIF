import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SermonListItem } from "@/components/SermonListItem";
import { getSermons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sermons & Resources",
  description: "Teaching and resources from DBIF, organized by focus area.",
};

export default async function SermonsPage() {
  const sermons = await getSermons();
  const categoryOrder = ["Marriage", "Finance/Business", "Leadership", "Deliverance", "Prayer"];
  const groupedSermons = categoryOrder
    .map((category) => ({
      category,
      items: sermons.filter((sermon) => sermon.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageHeader
        title="Sermons & Resources"
        intro="Teaching across Marriage, Finance/Business, Leadership, and Deliverance."
      />
      <Container narrow className="py-16 sm:py-20">
        <PreviewNotice />
        <div className="space-y-10">
          {groupedSermons.map(({ category, items }) => (
            <section
              key={category}
              id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
              className="scroll-mt-24"
            >
              <h2 className="font-display text-2xl font-medium text-ink">{category}</h2>
              <div className="mt-4">
                {items.map((sermon) => (
                  <SermonListItem key={sermon.slug} sermon={sermon} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
