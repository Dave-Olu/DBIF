/**
 * Shared content types for the DBIF website.
 *
 * Per PRD §24 (Project Assumptions), the developer does not invent missing
 * organizational information. Fields that hold facts only DBIF leadership
 * can supply (vision statement, official history, leadership names, etc.)
 * are typed as `string | null`. When `null`, the corresponding component
 * renders a <Pending /> placeholder instead of guessed text. See
 * src/data/README.md for the full list of what still needs confirming.
 */

export interface MinistryFocusArea {
  slug: "leadership" | "relationship" | "finance";
  title: string;
  summary: string;
}

export interface Location {
  slug: string;
  name: string;
  state: string;
  type: "physical" | "online-community";
  address: string | null;
  meetingInfo: string;
  contact: string | null;
  mapEmbedUrl: string | null;
}

export interface EventItem {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. "2026-11-14"
  time: string;
  venue: string;
  description: string;
  speakers: string[];
  registrationUrl: string | null;
  featured: boolean;
  status: "upcoming" | "past";
}

export interface Program {
  slug: string;
  title: string;
  audience: string;
  description: string;
}

export interface Sermon {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  category: string;
  scripture: string | null;
  description: string;
  audioUrl: string | null;
  videoUrl: string | null;
}

export interface Testimony {
  id: string;
  name: string | null; // null => published anonymously
  summary: string;
  location: string | null;
}

export interface LeadershipProfile {
  name: string | null;
  title: string | null;
  bio: string | null;
  photoUrl: string | null;
}

export interface Partner {
  name: string;
  relationship: string;
}

export interface GalleryImage {
  id: string;
  alt: string;
  category: "worship" | "outreach" | "conference" | "community";
}
