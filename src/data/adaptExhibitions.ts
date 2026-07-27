import raw from "./exhibitions.json";

/* ─────────────────────── Raw JSON shape ───────────────────────
   This mirrors what's in exhibitions.json. The source has changed
   shape before (bare array vs { events: [...] }), so normalizeRaw()
   below accepts either. It has also grown new optional fields
   (image, official_website, description, visitor_info) as the
   dataset has been enriched — those are optional here so older,
   unenriched entries don't break. */

export interface RawExhibitionEvent {
  slug: string;
  event_name: string;
  country: string;
  city: string;
  venue: string;
  start_date: string | null;
  end_date: string | null;
  status: "confirmed" | "listed" | "verified";
  image?: string;                    // filename in src/assets, e.g. "frankfurt-book-fair-2026.jpg"
  official_website?: string | null;
  summary: string;
  description?: string;              // fuller write-up; falls back to summary if absent
  visitor_info?: string | null;
  audience: string[];
  tags: string[];
  highlights: string[];
  source_urls: string[];
}

interface RawExhibitionsFile {
  generated_at?: string;
  note?: string;
  events: RawExhibitionEvent[];
}

function normalizeRaw(input: unknown): { events: RawExhibitionEvent[]; generatedAt?: string } {
  if (Array.isArray(input)) {
    return { events: input as RawExhibitionEvent[] };
  }
  if (input && typeof input === "object" && Array.isArray((input as RawExhibitionsFile).events)) {
    const file = input as RawExhibitionsFile;
    return { events: file.events, generatedAt: file.generated_at };
  }
  throw new Error(
    "exhibitions.json is not in a recognized shape — expected an array of events or { events: [...] }."
  );
}

/* ─────────────────────── App-facing shape ───────────────────────
   Every component (search, timeline, cards, detail page) reads from
   this type. Fields the source data doesn't provide for a given
   event (booth counts, visitor numbers, an application deadline)
   are left optional/undefined rather than filled with placeholder
   numbers — a made-up "1,250 publishers" for a real event is worse
   than not showing that stat. */

export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  country: string;
  flag: string;
  city: string;
  cityKnown: boolean;
  venue: string;
  venueKnown: boolean;
  startDate: string | null;
  endDate: string | null;
  dateLabel: string;
  monthLabel: string | null; // e.g. "September 2026", used by the month filter
  status: "confirmed" | "listed" | "verified";
  statusLabel: string;
  summary: string;
  description: string;       // fuller text for the detail page; falls back to summary
  visitorInfo: string | null;
  officialWebsite: string | null;
  categories: string[];
  audience: string[];
  highlights: string[];
  sourceUrls: string[];
  image: string;

  // Optional — only shown in the UI when present in real data.
  organizer?: string;
  deadline?: string;
  publishers?: number;
  authors?: number;
  booths?: number;
  visitors?: string;
}

/* ─────────────────────── Country → flag ─────────────────────── */

const FLAGS: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Ghana: "🇬🇭",
  Russia: "🇷🇺",
  "South Africa": "🇿🇦",
  Spain: "🇪🇸",
  Lebanon: "🇱🇧",
  "Sri Lanka": "🇱🇰",
  Sweden: "🇸🇪",
  Kenya: "🇰🇪",
  Serbia: "🇷🇸",
  Finland: "🇫🇮",
  Poland: "🇵🇱",
  "United Arab Emirates": "🇦🇪",
  Mexico: "🇲🇽",
  China: "🇨🇳",
  "Hong Kong": "🇭🇰",
  Austria: "🇦🇹",
  "Türkiye": "🇹🇷",
  Turkiye: "🇹🇷",
  Indonesia: "🇮🇩",
  Scotland: "🏴",
  France: "🇫🇷",
  Ireland: "🇮🇪",
  India: "🇮🇳",
  Switzerland: "🇨🇭",
  Singapore: "🇸🇬",
  Malta: "🇲🇹",
  Greece: "🇬🇷",
  Kosovo: "🇽🇰",
  Qatar: "🇶🇦",
};

function flagForCountry(country: string): string {
  return FLAGS[country] ?? "🌐";
}

/* ─────────────────────── Image resolution ───────────────────────
   Each event's `image` field is a filename expected to live in
   src/assets (e.g. "frankfurt-book-fair-2026.jpg"). Vite's
   import.meta.glob eagerly imports every matching asset at build
   time, so any file you add under src/assets is picked up
   automatically — no manual slug → import mapping to maintain.
   If an event has no `image` field, we assume "<slug>.jpg". If the
   file isn't found, we fall back to a generic placeholder image. */

const IMAGE_FILES = import.meta.glob("../assets/events/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const FALLBACK_IMAGE = IMAGE_FILES["../assets/exh-abudhabi.jpg"];

function imageForEvent(e: RawExhibitionEvent): string {
  const filename = e.image ?? `${e.slug}.jpg`;
  const key = `../assets/events/${filename}`;
  return IMAGE_FILES[key] ?? FALLBACK_IMAGE ?? "";
}

/* ─────────────────────── Date formatting ─────────────────────── */

const DAY_MONTH_YEAR = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
const DAY_MONTH = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long" });
const DAY_ONLY = new Intl.DateTimeFormat("en-GB", { day: "2-digit" });
const MONTH_YEAR = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });

function parseDate(d: string | null): Date | null {
  if (!d) return null;
  const parsed = new Date(`${d}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateLabel(startRaw: string | null, endRaw: string | null): string {
  const start = parseDate(startRaw);
  const end = parseDate(endRaw);

  if (!start) return "Dates to be confirmed";
  if (!end || start.getTime() === end.getTime()) return DAY_MONTH_YEAR.format(start);

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${DAY_ONLY.format(start)}–${DAY_MONTH_YEAR.format(end)}`;
  }
  if (sameYear) {
    return `${DAY_MONTH.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
  }
  return `${DAY_MONTH_YEAR.format(start)} – ${DAY_MONTH_YEAR.format(end)}`;
}

function monthLabelFor(startRaw: string | null): string | null {
  const start = parseDate(startRaw);
  return start ? MONTH_YEAR.format(start) : null;
}

/* ─────────────────────── Status label ─────────────────────── */

function statusLabelFor(status: RawExhibitionEvent["status"]): string {
  switch (status) {
    case "confirmed":
      return "Dates confirmed";
    case "verified":
      return "Verified listing";
    case "listed":
    default:
      return "Dates pending";
  }
}

/* ─────────────────────── Adapt ─────────────────────── */

function adaptOne(e: RawExhibitionEvent): Exhibition {
  return {
    id: e.slug,
    slug: e.slug,
    title: e.event_name,
    country: e.country,
    flag: flagForCountry(e.country),
    city: e.city,
    cityKnown: e.city !== "TBC",
    venue: e.venue,
    venueKnown: e.venue !== "TBC",
    startDate: e.start_date,
    endDate: e.end_date,
    dateLabel: formatDateLabel(e.start_date, e.end_date),
    monthLabel: monthLabelFor(e.start_date),
    status: e.status,
    statusLabel: statusLabelFor(e.status),
    summary: e.summary,
    description: e.description?.trim() || e.summary,
    visitorInfo: e.visitor_info ?? null,
    officialWebsite: e.official_website ?? null,
    categories: e.tags,
    audience: e.audience,
    highlights: e.highlights,
    sourceUrls: e.source_urls,
    image: imageForEvent(e),
  };
}

const { events, generatedAt } = normalizeRaw(raw);

export const EXHIBITIONS: Exhibition[] = events
  .map(adaptOne)
  // Fairs with no date at all sort to the end rather than the top.
  .sort((a, b) => {
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return a.startDate.localeCompare(b.startDate);
  });

export const DATA_GENERATED_AT = generatedAt;

export function getExhibitionBySlug(slug: string): Exhibition | undefined {
  return EXHIBITIONS.find((e) => e.slug === slug);
}

/* ─────────────────────── Derived filter option lists ─────────────────────── */

export const COUNTRY_OPTIONS: string[] = Array.from(
  new Set(EXHIBITIONS.map((e) => e.country))
).sort();

export const MONTH_OPTIONS: string[] = Array.from(
  new Set(EXHIBITIONS.map((e) => e.monthLabel).filter((m): m is string => Boolean(m)))
).sort((a, b) => {
  const da = new Date(`01 ${a}`);
  const db = new Date(`01 ${b}`);
  return da.getTime() - db.getTime();
});

export const CATEGORY_OPTIONS: string[] = Array.from(
  new Set(EXHIBITIONS.flatMap((e) => e.categories))
).sort();