import type { EventItem } from "@/lib/types";

/**
 * Sample/illustrative events only — demonstrates the Events page structure
 * (PRD §9.4). Replace with confirmed dates, venues, and speakers from DBIF
 * leadership before launch; do not publish these as real events.
 */
export const events: EventItem[] = [
  {
    slug: "leadership-summit-2026",
    title: "Leadership Summit",
    date: "2026-11-14",
    time: "9:00 AM",
    venue: "Lagos Main Auditorium",
    description:
      "A gathering for ministers, unit heads, and emerging leaders on stewardship, delegation, and building teams that outlast a season.",
    speakers: [],
    registrationUrl: null,
    featured: true,
    status: "upcoming",
  },
  {
    slug: "marriage-and-relationships-seminar",
    title: "Marriage & Relationships Seminar",
    date: "2026-12-05",
    time: "4:00 PM",
    venue: "Ibadan Branch",
    description:
      "A practical session for couples and singles on communication, conflict, and preparing for marriage well.",
    speakers: [],
    registrationUrl: null,
    featured: false,
    status: "upcoming",
  },
  {
    slug: "year-end-crossover-vigil",
    title: "Year-End Crossover Vigil",
    date: "2026-12-31",
    time: "10:00 PM",
    venue: "Lagos Main Auditorium (livestreamed)",
    description:
      "A night of prayer and worship into the new year, open to all DBIF locations and the online community.",
    speakers: [],
    registrationUrl: null,
    featured: true,
    status: "upcoming",
  },
  {
    slug: "singles-fellowship-retreat",
    title: "Singles Fellowship Retreat",
    date: "2026-08-09",
    time: "All day",
    venue: "Ogun Branch",
    description:
      "A weekend retreat for singles and young professionals built around the Relationship focus area.",
    speakers: [],
    registrationUrl: null,
    featured: false,
    status: "past",
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");
export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];
