import type { CollectionName, Item } from "@/lib/content";

export type FieldType = "text" | "textarea" | "date" | "url" | "mapurl" | "list" | "checkbox";
export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hint?: string;
}
export interface CollectionDef {
  label: string;
  singular: string;
  titleField: string;
  fields: FieldDef[];
  /** Fixed values added to every saved item. */
  fixed?: Record<string, unknown>;
}

export const collections: Record<CollectionName, CollectionDef> = {
  events: {
    label: "Events",
    singular: "event",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "text", required: true, hint: "e.g. 9:00 AM" },
      { name: "venue", label: "Venue", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "speakers", label: "Speakers", type: "list", hint: "Separate names with commas" },
      { name: "registrationUrl", label: "Registration link", type: "url", hint: "Optional. Must start with https://" },
      { name: "featured", label: "Feature on the home page", type: "checkbox" },
    ],
  },
  sermons: {
    label: "Sermons & resources",
    singular: "sermon",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "speaker", label: "Speaker", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "category", label: "Category", type: "text", required: true, hint: "e.g. Leadership, Relationship, Finance" },
      { name: "scripture", label: "Scripture reference", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "videoUrl", label: "Video link", type: "url", hint: "Optional. https:// only" },
      { name: "audioUrl", label: "Audio link", type: "url", hint: "Optional. https:// only" },
    ],
  },
  locations: {
    label: "Locations",
    singular: "branch",
    titleField: "name",
    fixed: { type: "physical" },
    fields: [
      { name: "name", label: "Branch name", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "address", label: "Address / venue", type: "text" },
      { name: "meetingInfo", label: "Service and meeting times", type: "textarea", required: true },
      { name: "contact", label: "Contact details", type: "text" },
      { name: "mapEmbedUrl", label: "Google Maps embed link", type: "mapurl", hint: "In Google Maps: Share, Embed a map, copy the src link" },
    ],
  },
};

const MAX = { text: 200, textarea: 3000, url: 500 } as const;

export function slugify(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "item";
}

export function parseHttpsUrl(v: string): string | null {
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function parseMapUrl(v: string): string | null {
  const u = parseHttpsUrl(v);
  if (!u) return null;
  const { hostname, pathname } = new URL(u);
  return hostname === "www.google.com" && pathname.startsWith("/maps/embed") ? u : null;
}

export type ParseResult = { ok: true; item: Item } | { ok: false; error: string };

export function parseItem(def: CollectionDef, fd: FormData, existingSlugs: string[], editingSlug: string | null): ParseResult {
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    const raw = String(fd.get(f.name) ?? "").trim();
    if (f.type === "checkbox") { out[f.name] = fd.get(f.name) === "on"; continue; }
    if (f.type === "list") { out[f.name] = raw ? raw.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 20) : []; continue; }
    if (!raw) {
      if (f.required) return { ok: false, error: `${f.label} is required.` };
      out[f.name] = null;
      continue;
    }
    const max = f.type === "textarea" ? MAX.textarea : f.type === "url" || f.type === "mapurl" ? MAX.url : MAX.text;
    if (raw.length > max) return { ok: false, error: `${f.label} is too long.` };
    if (f.type === "date") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(raw) || Number.isNaN(Date.parse(`${raw}T00:00:00Z`))) return { ok: false, error: `${f.label} is not a valid date.` };
    }
    if (f.type === "url") {
      const u = parseHttpsUrl(raw);
      if (!u) return { ok: false, error: `${f.label} must be a full link starting with https://` };
      out[f.name] = u; continue;
    }
    if (f.type === "mapurl") {
      const u = parseMapUrl(raw);
      if (!u) return { ok: false, error: `${f.label} must be the https://www.google.com/maps/embed link from Google Maps.` };
      out[f.name] = u; continue;
    }
    out[f.name] = raw;
  }
  let slug = editingSlug;
  if (!slug) {
    const base = slugify(String(out[def.titleField]));
    slug = base;
    for (let n = 2; existingSlugs.includes(slug); n++) slug = `${base}-${n}`;
  }
  return { ok: true, item: { slug, ...out, ...(def.fixed ?? {}) } };
}
