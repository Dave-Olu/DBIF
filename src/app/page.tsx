import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { SermonListItem } from "@/components/SermonListItem";
import { TestimonyCard } from "@/components/TestimonyCard";
import { Button } from "@/components/Button";
import { upcomingEvents } from "@/data/events";
import { sermons } from "@/data/sermons";
import { testimonies } from "@/data/testimonies";
import { physicalLocations } from "@/data/locations";

const pillars = [
  {
    title: "Discover",
    description:
      "Helping you identify your spiritual gifts, purpose, and unique calling in life.",
  },
  {
    title: "Build",
    description:
      "Equipping you with biblical wisdom, leadership skills, and practical tools to grow.",
  },
  {
    title: "Deploy",
    description:
      "Launching you into your career, ministry, or community to make a lasting global impact.",
  },
];

const nextSteps = [
  {
    title: "Join a Live Service",
    description: "Experience our uplifting worship and life-transforming messages firsthand.",
    href: "/events",
  },
  {
    title: "Connect with a Small Group",
    description: "Growth happens in circles, not just rows. Join a local or virtual cell group today.",
    href: "/locations",
  },
  {
    title: "Volunteer Your Skills",
    description: "Use your unique talents to serve others and build the kingdom through one of our active departments.",
    href: "/contact",
  },
];

const faqs = [
  {
    question: "What is DBIF?",
    answer:
      "DBIF is a Christian fellowship committed to helping people discover purpose, build strong relationships, and live with biblical wisdom in every area of life.",
  },
  {
    question: "Where can I attend a DBIF fellowship?",
    answer: (
      <>
        Visit the{" "}
        <Link href="/locations" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          locations page
        </Link>{" "}
        to learn about nearby fellowship gatherings and online communities.
      </>
    ),
  },
  {
    question: "How can I join the online community?",
    answer: (
      <>
        DBIF shares community updates and fellowship links through the online communities listed on the{" "}
        <Link href="/locations" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          locations page
        </Link>.
      </>
    ),
  },
  {
    question: "What programs does DBIF offer?",
    answer: (
      <>
        DBIF focuses on discipleship, leadership development, relationships, marriage, finance, and community service. View the{" "}
        <Link href="/programs" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          programs page
        </Link>{" "}
        for the current ministry focus areas.
      </>
    ),
  },
  {
    question: "Where can I find upcoming events and teachings?",
    answer: (
      <>
        Explore the{" "}
        <Link href="/events" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          events page
        </Link>{" "}
        for programs and the{" "}
        <Link href="/sermons" className="font-medium text-forest underline decoration-forest/40 underline-offset-4 hover:decoration-forest">
          sermons page
        </Link>{" "}
        for teaching resources.
      </>
    ),
  },
  {
    question: "How can I contact DBIF?",
    answer: (
      <>
        You can reach the fellowship through the{" "}
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

      <section className="relative overflow-hidden bg-paper-dim py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">The DBIF journey</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">
                Our commitment to you
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink/65">
              Discover your God-given purpose, build the capacity to fulfil it, and step out to make a lasting impact.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={`${pillar.title}-card`} className="group relative overflow-hidden border border-ink/10 bg-paper p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-forest" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-forest/20">0{pillars.indexOf(pillar) + 1}</span>
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-sm font-semibold text-forest">
                    {pillar.title.charAt(0)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-3xl font-medium text-ink">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            title="Ready to take your next step?"
            intro="You don't have to navigate your purpose alone. Here is how you can get plugged in right away."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col border border-ink/10 bg-paper p-6 sm:p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">Step 0{index + 1}</span>
                <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{step.description}</p>
                <Link href={step.href} className="mt-6 inline-flex w-fit items-center gap-2 border-b border-forest/40 pb-1 font-medium text-forest hover:border-forest">
                  Take this step
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-dim py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden border border-gold/30 bg-paper p-8 shadow-sm sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">New here?</p>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                  We would love to connect with you.
                </h2>
                <p className="mt-4 leading-relaxed text-ink/70">
                  Are you visiting us for the first time? We want to get to know you better and answer any questions you might have.
                </p>
              </div>
              <Button href="/contact" variant="primary" className="w-fit">
                Fill out our digital connect card
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="grain-panel py-16 text-paper sm:py-20">
        <Container narrow>
          <div className="text-center">
            <span aria-hidden="true" className="mx-auto block h-1 w-12 bg-gold" />
            <p className="mt-7 font-display text-2xl italic leading-relaxed text-paper/90 sm:text-3xl">
              “For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.” — Jeremiah 29:11
            </p>
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-gold-light">
              Welcome to the family. Your journey to greatness starts here!
            </p>
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
