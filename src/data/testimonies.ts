import type { Testimony } from "@/lib/types";

/**
 * Sample testimonies only, for layout purposes. PRD §9.6 / §14 require
 * published testimonies to have individual consent — do not publish real
 * member testimonies here without that consent on file.
 */
export const testimonies: Testimony[] = [
  {
    id: "t1",
    name: null,
    summary:
      "Through the Marriage & Family teaching, my spouse and I learned how to actually talk to each other again instead of just avoiding the hard conversations.",
    location: "Lagos",
  },
  {
    id: "t2",
    name: null,
    summary:
      "The Leadership Development track gave me practical tools I now use every week at work, not just at church.",
    location: "Ibadan",
  },
  {
    id: "t3",
    name: null,
    summary:
      "Joining the online community from abroad meant I didn't lose my connection to church when I relocated.",
    location: "United Kingdom (online)",
  },
];
