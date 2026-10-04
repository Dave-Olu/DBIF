import type { Program } from "@/lib/types";

// PRD §5: DBIF serves people at different life stages; PRD §8 lists
// Programs/Ministries in the sitemap. Grouped here by audience.
export const programs: Program[] = [
  {
    slug: "children",
    title: "Children's Ministry",
    audience: "Children",
    description:
      "Age-appropriate teaching and activities that introduce children to God's word in a way they can carry with them.",
  },
  {
    slug: "youth",
    title: "Youth Fellowship",
    audience: "Youths",
    description:
      "A space for teenagers and young adults to grow in faith together, ask honest questions, and build lasting friendships.",
  },
  {
    slug: "campus",
    title: "Campus Fellowship",
    audience: "Campus students",
    description:
      "Support for students navigating faith, studies, and independence for the first time.",
  },
  {
    slug: "singles",
    title: "Singles Fellowship",
    audience: "Singles",
    description:
      "Teaching and community for singles preparing well for the next season of life, whatever it holds.",
  },
  {
    slug: "young-professionals",
    title: "Young Professionals",
    audience: "Young professionals",
    description:
      "Helping people early in their careers integrate faith, work, and calling without losing either.",
  },
  {
    slug: "marriage",
    title: "Marriage & Family",
    audience: "Married couples",
    description:
      "Ongoing support for couples — premarital teaching, enrichment sessions, and counsel when things get hard.",
  },
  {
    slug: "widows",
    title: "Widows & Widowers Support",
    audience: "Widows and widowers",
    description:
      "Pastoral care and practical support for those who have lost a spouse.",
  },
  {
    slug: "leaders",
    title: "Leadership Development",
    audience: "Ministers and leaders",
    description:
      "Training and mentorship for ministers and leaders serving across DBIF's branches and communities.",
  },
];
