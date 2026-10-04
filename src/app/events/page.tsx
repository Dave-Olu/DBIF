import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents, getPastEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past DBIF programs, conferences, and vigils.",
};

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([getUpcomingEvents(), getPastEvents()]);
  return (
    <>
      <PageHeader title="Events" intro="Programs, conferences, and vigils across DBIF's locations." />
      <Container className="py-16 sm:py-20">
        <h2 className="font-display text-2xl font-medium text-ink">Upcoming</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>

        {pastEvents.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-2xl font-medium text-ink">Past events</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
