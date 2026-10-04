import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { getEvent, getEvents } from "@/lib/content";
import { formatDate } from "@/lib/utils";

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
      <PageHeader title={event.title} intro={`${formatDate(event.date)} · ${event.time} · ${event.venue}`} />
      <Container narrow className="py-16 sm:py-20">
        <p className="text-lg leading-relaxed text-ink/80">{event.description}</p>

        {event.speakers.length > 0 && (
          <p className="mt-6 text-ink/70">
            <span className="font-medium text-ink">Speakers: </span>
            {event.speakers.join(", ")}
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {event.registrationUrl ? (
            <Button href={event.registrationUrl}>Register</Button>
          ) : (
            <Button href="/contact">Ask about this event</Button>
          )}
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
