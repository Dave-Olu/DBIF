import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { getEvent, getEvents } from "@/lib/content";
import { formatDateRange } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export async function generateStaticParams() {
  return (await getEvents()).map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEvent(params.slug);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) notFound();

  return (
    <>
      <PageHeader title={event.title} intro={`${formatDateRange(event.date, event.endDate)} · ${event.time} · ${event.venue}`} />
      <Container narrow className="py-16 sm:py-20">
        {event.posterUrl && (
          <div className="relative mx-auto mb-10 aspect-[3/4] w-full max-w-xl overflow-hidden bg-paper-dim">
            <ImageWithFallback
              src={event.posterUrl}
              alt={`Poster for ${event.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 576px"
              className="object-contain"
            />
          </div>
        )}
        <p className="text-lg leading-relaxed text-ink/80">{event.description}</p>

        {event.speakers.length > 0 && (
          <p className="mt-6 text-ink/70">
            <span className="font-medium text-ink">Speakers: </span>
            {event.speakers.join(", ")}
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {event.facebookUrl && (
            <a
              href={event.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
            >
              Join on Facebook
            </a>
          )}
          {event.telegramUrl && (
            <a
              href={event.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
            >
              Join on Telegram
            </a>
          )}
          {!event.facebookUrl && !event.telegramUrl && event.registrationUrl ? (
            <Button href={event.registrationUrl}>Register</Button>
          ) : !event.facebookUrl && !event.telegramUrl ? (
            <Button href="/contact">Ask about this event</Button>
          ) : null}
          <Button href="/events" variant="secondary">
            Back to all events
          </Button>
        </div>

        <p className="mt-10 text-sm text-ink/50">
          Need directions? Check{" "}
          <Link href="/locations" className="underline">
            our locations page
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
