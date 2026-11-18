import type { EventItem } from "@/lib/types";
import { todayInLagos } from "@/lib/utils";

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
  {
    slug: "turning-up-your-down-times-modakeke-2026",
    title: "Turning Up Your Down Times",
    date: "2026-11-22",
    time: "2:00 PM–5:00 PM (WAT)",
    venue: "@Elok Cocoa Store, Olorunsogo along Town Hall, Modakeke, Osun State",
    description:
      "DBIF returns to Modakeke for an uplifting gathering themed “Turning Up Your Down Times” (Genesis 50:20). Prolocutor: Julius A. Awoniyi.",
    speakers: ["Julius A. Awoniyi"],
    registrationUrl: null,
    posterUrl: "/events/turning-up-down-times-modakeke-2026.png",
    featured: true,
    status: "upcoming",
  },
  {
    slug: "seven-compulsory-prayer-points-ondo-2026",
    title: "7 Compulsory Prayer Points for Every Winning Believer",
    date: "2026-11-29",
    time: "2:00 PM–5:00 PM (WAT)",
    venue: "Noble Academy N/P School, Opp First Bank, End of the Street, Yaba-Ondo, Ondo State",
    description:
      "Join DBIF in Ondo for this crucial-season gathering and a focused time of prayer. Prolocutor: Julius A. Awoniyi.",
    speakers: ["Julius A. Awoniyi"],
    registrationUrl: null,
    posterUrl: "/events/prayer-points-ondo-2026.png",
    featured: true,
    status: "upcoming",
  },
  {
    slug: "pre-crossover-online-vigil-2026",
    title: "Pre-Crossover Online Vigil",
    date: "2026-12-30",
    time: "12:00 AM–1:30 AM (WAT)",
    venue: "Online via DBIF Facebook and Telegram",
    description:
      "Join the DBIF community online for a 90-minute pre-crossover vigil. The vigil streams on Facebook and Telegram.",
    speakers: [],
    registrationUrl: null,
    facebookUrl: "https://www.facebook.com/share/g/1KLGVAoTT7/",
    telegramUrl: "https://t.me/dbif5",
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

const today = todayInLagos();
export const upcomingEvents = events.filter((e) => (e.endDate ?? e.date) >= today);
export const pastEvents = events.filter((e) => (e.endDate ?? e.date) < today);
export const featuredEvent = upcomingEvents.find((e) => e.featured) ?? upcomingEvents[0];
