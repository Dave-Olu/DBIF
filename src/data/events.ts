import type { EventItem } from "@/lib/types";
import { todayInLagos } from "@/lib/utils";

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
    slug: "singles-summit",
    title: "Quarterly & National Special Singles' Summit",
    date: "2026-11-20",
    endDate: "2026-11-21",
    time: "3:00 PM Friday - 3:00 PM Saturday",
    venue: "Victory Kiddies Academy, Timilehin B/S, Off Jeje Filling Station, Alakia, Ibadan, Oyo State",
    description:
      "Theme: I Will Marry in 2027 & Not Be Denied. Features include knowing who to marry, attracting who to marry, going beyond matchmaking, learning the courtship syllabus, preparing for wedding, matrimony and squatterhood, handling the early years of marriage, and breaking binding bondages. Convenor: Julius A. Awoniyi. Call +2348035553669 or +2348027844990, or message t.me/dbif5.",
    speakers: [],
    registrationUrl: null,
    posterUrl: "/events/singles-summit-2026.png",
    featured: true,
    status: "upcoming",
  },
  // {
  //   slug: "year-end-crossover-vigil",
  //   title: "Year-End Crossover Vigil",
  //   date: "2026-12-31",
  //   time: "10:00 PM",
  //   venue: "Lagos Main Auditorium (livestreamed)",
  //   description:
  //     "A night of prayer and worship into the new year, open to all DBIF locations and the online community.",
  //   speakers: [],
  //   registrationUrl: null,
  //   featured: true,
  //   status: "upcoming",
  // },
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

const today = todayInLagos();
export const upcomingEvents = events.filter((e) => (e.endDate ?? e.date) >= today);
export const pastEvents = events.filter((e) => (e.endDate ?? e.date) < today);
export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];
