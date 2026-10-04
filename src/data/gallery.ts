import type { GalleryImage } from "@/lib/types";

/**
 * PRD §15: real photos/videos are supplied by DBIF. Until then this
 * generates textured placeholder tiles (see GalleryGrid component) so the
 * layout and admin workflow (§10) can be demonstrated without stand-in
 * stock photography.
 */
export const galleryImages: GalleryImage[] = [
  { id: "g1", alt: "Sunday worship service", category: "worship" },
  { id: "g2", alt: "Community outreach", category: "outreach" },
  { id: "g3", alt: "Leadership summit", category: "conference" },
  { id: "g4", alt: "Youth fellowship gathering", category: "community" },
  { id: "g5", alt: "Marriage seminar", category: "conference" },
  { id: "g6", alt: "Children's ministry class", category: "community" },
  { id: "g7", alt: "Crossover vigil", category: "worship" },
  { id: "g8", alt: "Branch dedication", category: "outreach" },
];
