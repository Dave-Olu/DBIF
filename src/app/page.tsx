import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MinistryPillars } from "@/components/MinistryPillars";
import { EventCard } from "@/components/EventCard";
import { SermonListItem } from "@/components/SermonListItem";
import { TestimonyCard } from "@/components/TestimonyCard";
import { Button } from "@/components/Button";
import { upcomingEvents } from "@/data/events";
import { sermons } from "@/data/sermons";
import { testimonies } from "@/data/testimonies";
import { physicalLocations } from "@/data/locations";

const faqs = [
  {
    question: "What is DBIF?",
    answer:
      "Destiny Builders International Fellowship is a Christian fellowship helping people build the destiny God has given them, with a focus on leadership, relationships, and faithful financial stewardship.",
  },
  {
    question: "Where can I attend a DBIF fellowship?",
    answer: (
      <>
        DBIF has confirmed physical branches across several states. Visit the{" "}
        <Link href="/locations" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          locations page
        </Link>{" "}
        to find a branch near you.
      </>
    ),
  },
  {
    question: "How can I join the online community?",
    answer: (
      <>
        Find the WhatsApp and Telegram community links in the{" "}
        <Link href="/locations" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          online communities section
        </Link>.
      </>
    ),
  },
  {
    question: "What programs does DBIF offer?",
    answer: (
      <>
        Programs serve children, youths, campus students, singles, couples, young professionals, and ministry leaders. See the{" "}
        <Link href="/programs" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          programs page
        </Link>{" "}
        for details.
      </>
    ),
  },
  {
    question: "Where can I find upcoming events and teachings?",
    answer: (
      <>
        Browse gatherings on the{" "}
        <Link href="/events" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          events page
        </Link>{" "}
        and recorded messages on the{" "}
        <Link href="/sermons" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          sermons page
        </Link>.
      </>
    ),
  },
  {
    question: "How can I contact DBIF?",
    answer: (
      <>
        Send a message through the{" "}
        <Link href="/contact" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          contact page
        </Link>.
      </>
    ),
  },
];

export default function HomePage() {
  const featuredEvents = upcomingEvents.slice(0, 2);
  const featuredSermon = sermons[0];
  const featuredTestimony = testimonies[0];

  return (
    <>
      <Hero />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Three areas, one mandate"
            intro="Everything DBIF teaches and builds sits on these three areas of focus."
          />
          <div className="mt-10">
            <MinistryPillars />
          </div>
        </Container>
      </section>

      {featuredEvents.length > 0 && (
        <section className="bg-paper-dim py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading title="Upcoming events" />
              <Button href="/events" variant="secondary">
                View all events
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featuredEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {featuredSermon && (
        <section className="py-20 sm:py-24">
          <Container narrow>
            <SectionHeading title="Latest teaching" />
            <div className="mt-8">
              <SermonListItem sermon={featuredSermon} />
            </div>
            <Button href="/sermons" variant="secondary" className="mt-6">
              Browse all sermons
            </Button>
          </Container>
        </section>
      )}

      {featuredTestimony && (
        <section className="bg-paper-dim py-20 sm:py-24">
          <Container narrow>
            <SectionHeading title="Lives being built" />
            <div className="mt-8">
              <TestimonyCard testimony={featuredTestimony} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/testimonies" variant="secondary">
                Read more testimonies
              </Button>
              <Button href="/testimonies/share">
                Share your testimony
              </Button>
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Growing across Nigeria and beyond"
            intro={`With branches across ${physicalLocations.length} states and an online community reaching the diaspora, there's likely a way to connect with DBIF near you.`}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {physicalLocations.map((loc) => (
              <span key={loc.slug} className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/70">
                {loc.state}
              </span>
            ))}
          </div>
          <Button href="/locations" variant="secondary" className="mt-8">
            Find a location
          </Button>
        </Container>
      </section>

      <section className="bg-paper-dim py-20 sm:py-24" aria-label="Frequently asked questions">
        <Container narrow>
          <SectionHeading
            title="Frequently asked questions"
            intro="Quick answers about connecting with DBIF and taking part."
          />
          <div className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-ink marker:content-none">
                  <span>{faq.question}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 text-forest transition-transform group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="pb-5 pr-8 text-sm leading-relaxed text-ink/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="grain-panel py-20 text-paper sm:py-24">
        <Container narrow className="text-center">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            Wherever you are, there&apos;s a place for you here.
          </h2>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/contact" variant="primary">
              Connect with us
            </Button>
            <Button href="/events" variant="ghost">
              See what&apos;s coming up
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
