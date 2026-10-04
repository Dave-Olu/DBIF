import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getEvents, getSermons } from "@/lib/content";

const staticRoutes = [
  "",
  "/about",
  "/about/history",
  "/about/vision-mission",
  "/about/core-values",
  "/about/leadership",
  "/about/ministry-focus",
  "/locations",
  "/programs",
  "/events",
  "/sermons",
  "/testimonies",
  "/gallery",
  "/partnerships",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, sermons] = await Promise.all([getEvents(), getSermons()]);
  const base = site.url;
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
  }));

  const eventEntries = events.map((event) => ({
    url: `${base}/events/${event.slug}`,
    lastModified: now,
  }));

  const sermonEntries = sermons.map((sermon) => ({
    url: `${base}/sermons/${sermon.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...eventEntries, ...sermonEntries];
}
