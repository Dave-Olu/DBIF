import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { getSermon, getSermons } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getSermons()).map((sermon) => ({ slug: sermon.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sermon = await getSermon(params.slug);
  if (!sermon) return {};
  return { title: sermon.title, description: sermon.description };
}

export default async function SermonDetailPage({ params }: { params: { slug: string } }) {
  const sermon = await getSermon(params.slug);
  if (!sermon) notFound();

  return (
    <>
      <PageHeader
        title={sermon.title}
        intro={[sermon.speaker, sermon.category, sermon.scripture].filter(Boolean).join(" · ")}
      />
      <Container narrow className="py-16 sm:py-20">
        {sermon.date && <p className="text-sm text-ink/50">{formatDate(sermon.date)}</p>}
        <p className="mt-4 text-lg leading-relaxed text-ink/80">{sermon.description}</p>

        {(sermon.audioUrl || sermon.videoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {sermon.videoUrl && (
              <a
                href={sermon.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
              >
                Watch on Telegram
              </a>
            )}
            {sermon.audioUrl && <Button href={sermon.audioUrl} variant="secondary">Listen</Button>}
          </div>
        )}

        <Button href="/sermons" variant="secondary" className="mt-10">
          Back to all sermons
        </Button>
      </Container>
    </>
  );
}
