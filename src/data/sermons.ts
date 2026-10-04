import type { Sermon } from "@/lib/types";

/**
 * Sample/illustrative resources only — demonstrates the Sermons & Resources
 * page structure (PRD §9.5). Replace with real speaker names, dates, and
 * media links once DBIF supplies them (PRD §15).
 */
export const sermons: Sermon[] = [
  {
    slug: "leading-with-a-servants-heart",
    title: "Leading With a Servant's Heart",
    speaker: "To be confirmed",
    date: "2026-09-06",
    category: "Leadership",
    scripture: "Mark 10:42–45",
    description:
      "What it means to lead the way Christ led — putting the people you're responsible for ahead of your own comfort.",
    audioUrl: null,
    videoUrl: null,
  },
  {
    slug: "building-a-marriage-that-lasts",
    title: "Building a Marriage That Lasts",
    speaker: "To be confirmed",
    date: "2026-08-23",
    category: "Relationship",
    scripture: "Ecclesiastes 4:9–12",
    description:
      "Practical foundations for couples — communication, forgiveness, and staying committed through change.",
    audioUrl: null,
    videoUrl: null,
  },
  {
    slug: "stewardship-before-increase",
    title: "Stewardship Before Increase",
    speaker: "To be confirmed",
    date: "2026-08-02",
    category: "Finance",
    scripture: "Luke 16:10",
    description:
      "Why how you manage what you have now shapes what you're trusted with next.",
    audioUrl: null,
    videoUrl: null,
  },
  {
    slug: "holiness-in-an-ordinary-week",
    title: "Holiness in an Ordinary Week",
    speaker: "To be confirmed",
    date: "2026-07-19",
    category: "Holiness",
    scripture: "1 Peter 1:15–16",
    description:
      "Holiness as a daily posture rather than an occasional feeling — practiced at work, at home, and online.",
    audioUrl: null,
    videoUrl: null,
  },
];

export const sermonCategories = Array.from(new Set(sermons.map((s) => s.category)));
