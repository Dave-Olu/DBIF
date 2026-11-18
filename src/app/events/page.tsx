import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past DBIF programs, conferences, and vigils.",
};

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getPastEvents()]);
  return (
    <>
      <PageHeader title="Events" intro="Programs, conferences, and vigils across DBIF's locations." />
      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Gather, grow & connect</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">Upcoming events</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60">
            Find a gathering near you or join our online community. Select an event for the full details.
          </p>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="mt-7 grid gap-5 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
          </div>
        ) : (
          <p className="mt-7 border border-dashed border-ink/20 px-5 py-8 text-ink/60">
            There are no upcoming events at the moment. Please check back soon.
          </p>
        )}

        {pastEvents.length > 0 && (
          <>
            <div className="mt-16 border-b border-ink/10 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Looking back</p>
              <h2 className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl">Past events</h2>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
