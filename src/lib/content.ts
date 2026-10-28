import { readJson, readString, updateJson } from "@/lib/store";
import { events as seedEvents } from "@/data/events";
import { sermons as seedSermons } from "@/data/sermons";
import { allLocations as seedLocations } from "@/data/locations";
import { site } from "@/data/site";
import { todayInLagos } from "@/lib/utils";
import { galleryImages as seedGalleryImages } from "@/data/gallery";
import type { EventItem, GalleryImage, Location, Sermon } from "@/lib/types";

export type CollectionName = "events" | "sermons" | "locations";
export type Item = { slug: string } & Record<string, unknown>;

const seeds: Record<CollectionName, () => Item[]> = {
  events: () => structuredClone(seedEvents) as unknown as Item[],
  sermons: () => structuredClone(seedSermons) as unknown as Item[],
  locations: () => structuredClone(seedLocations) as unknown as Item[],
};

export const listItems = (c: CollectionName): Promise<Item[]> => readJson(c, seeds[c]);

export async function upsertItem(c: CollectionName, item: Item) {
  await updateJson<Item[]>(c, seeds[c], (list) => {
    const i = list.findIndex((x) => x.slug === item.slug);
    if (i >= 0) list[i] = item;
    else list.push(item);
    return list;
  });
}

export async function removeItem(c: CollectionName, slug: string) {
  await updateJson<Item[]>(c, seeds[c], (list) => list.filter((x) => x.slug !== slug));
}

// ---- typed public getters ----

export async function getEvents(): Promise<EventItem[]> {
  const today = todayInLagos();
  const list = (await listItems("events")) as unknown as EventItem[];
  return list.map((e) => ({ ...e, status: e.date >= today ? "upcoming" : "past" }) as EventItem);
}
export async function getUpcomingEvents() {
  return (await getEvents()).filter((e) => e.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date));
}
export async function getPastEvents() {
  return (await getEvents()).filter((e) => e.status === "past").sort((a, b) => b.date.localeCompare(a.date));
}
export async function getEvent(slug: string) {
  return (await getEvents()).find((e) => e.slug === slug);
}

export async function getSermons(): Promise<Sermon[]> {
  const list = (await listItems("sermons")) as unknown as Sermon[];
  return [...list].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
export async function getSermon(slug: string) {
  return (await getSermons()).find((s) => s.slug === slug);
}

export async function getLocations(): Promise<Location[]> {
  return (await listItems("locations")) as unknown as Location[];
}

export async function getPhysicalLocations(): Promise<Location[]> {
  return (await getLocations()).filter((location) => location.type === "physical");
}

export async function getOnlineCommunities(): Promise<Location[]> {
  return (await getLocations()).filter((location) => location.type === "online-community");
}

// ---- contact + social settings ----

export interface Settings {
  contact: { phone: string | null; whatsapp: string | null; email: string | null; address: string | null };
  social: { facebook: string | null; instagram: string | null; youtube: string | null; tiktok: string | null; x: string | null };
}

const seedSettings = (): Settings => ({
  contact: { ...site.contact },
  social: { ...site.social },
});

export const getSettings = (): Promise<Settings> => readJson("settings", seedSettings);
export const saveSettings = (s: Settings) => updateJson<Settings>("settings", seedSettings, () => s);

export const getAnnouncement = (): Promise<string> => readString("announcement", () => site.announcement);
export const saveAnnouncement = (announcement: string) =>
  updateJson<string>("announcement", () => site.announcement, () => announcement);

const seedGallery = (): GalleryImage[] => structuredClone(seedGalleryImages);
export const getGalleryImages = (): Promise<GalleryImage[]> => readJson("gallery", seedGallery);

export async function upsertGalleryImage(image: GalleryImage) {
  await updateJson<GalleryImage[]>("gallery", seedGallery, (list) => {
    const index = list.findIndex((entry) => entry.id === image.id);
    if (index >= 0) list[index] = image;
    else list.push(image);
    return list;
  });
}

export async function removeGalleryImage(id: string) {
  await updateJson<GalleryImage[]>("gallery", seedGallery, (list) => list.filter((image) => image.id !== id));
}
