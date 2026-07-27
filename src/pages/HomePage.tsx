import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Search, MapPin, Calendar, Users, Building2, BookOpen, Globe2, ArrowRight,
  CheckCircle2, Clock, Languages, ChevronRight, BadgeCheck, BookMarked,
  UserPlus, CalendarClock, Handshake, Trophy, LayoutGrid,
  MessagesSquare, Ticket, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Quote, X,
  type LucideIcon,
} from "lucide-react";

import authorSigning from "../assets/author-signing.jpg";
import logohead from "../assets/logohead.png";
import logofoot from "../assets/logofoot.png";

import { EXHIBITIONS, COUNTRY_OPTIONS, MONTH_OPTIONS, CATEGORY_OPTIONS, type Exhibition } from "../data/adaptExhibitions";
import {
  useExhibitionFilters, ALL_COUNTRIES, ALL_MONTHS, ALL_CATEGORIES,
  type UseExhibitionFiltersResult,
} from "../hooks/useExhibitionFilters";

/* ─────────────────────────── Page metadata ─────────────────────────── */
interface PageMeta {
  title: string;
  description: string;
}

const PAGE_META: PageMeta = {
  title: "Global Book Fair Directory — Find & Apply to Book Fairs Worldwide",
  description:
    "A directory of international book fairs, literary festivals and publishing expos. Search by country, date and category, and apply to exhibit directly.",
};

function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}

/* ────────────────────────── Page ────────────────────────── */
/* Order: browse (hero/search/exhibitions) -> calendar -> persuasion
   (why exhibit / platform) -> social proof (testimonials/stats) ->
   close (CTA/footer). */

export default function HomePage() {
  usePageMeta(PAGE_META);
  const filtersApi = useExhibitionFilters();

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <Nav />
      <Hero />
      <SearchBar filtersApi={filtersApi} />
      <FeaturedExhibitions filtersApi={filtersApi} />
      <Timeline filtersApi={filtersApi} />
      <WhyExhibit />
      <PlatformBenefits />
      <Testimonials />
     
      <CtaBanner />
      <Footer />
    </main>
  );
}

/* ─── Nav (links to every section, no sign-in) ─── */
export function Nav() {
  const links = [
    { href: "/#exhibitions", label: "Exhibitions" },
    { href: "/#timeline", label: "Calendar" },
    { href: "/#why-exhibit", label: "Why Exhibit" },
    { href: "/#platform", label: "Platform" },
    { href: "/#testimonials", label: "Reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logohead} className="h-14 w-auto" alt="Global Book Fair" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-charcoal/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-navy transition-colors">{l.label}</a>
          ))}
        </nav>
        <Link to="/register" className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-cream hover:bg-navy-deep transition-colors">
          Register your book
        </Link>
      </div>
    </header>
  );
}

/* ─── Hero (per-exhibition slider, driven by real data) ─── */
function Hero() {
  const slides = EXHIBITIONS.slice(0, 6); // cap the slider so one huge dataset doesn't make it endless
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const go = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-navy text-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[560px] overflow-hidden sm:h-[520px] lg:h-[600px]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${index * (100 / slides.length)}%)` }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="relative h-full shrink-0"
              style={{ width: `${100 / slides.length}%` }}
              aria-hidden={s.id !== slides[index].id}
            >
              <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-navy-deep/50" />

              <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-center px-6">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cream/80">
                    {s.flag} {s.cityKnown ? `${s.city}, ` : ""}{s.country}
                  </span>

                  <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    {s.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-cream/80">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" /> {s.dateLabel}</span>
                    {s.venueKnown && (
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {s.venue}</span>
                    )}
                  </div>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/70 sm:text-base">
                    {s.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to={`/exhibitions/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold/90 transition-colors"
                    >
                      View exhibition <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 rounded-md border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-cream/10 transition-colors"
                    >
                      <UserPlus className="h-4 w-4" /> Apply to exhibit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`rounded-full transition-all ${i === index ? "h-8 w-1.5 bg-gold" : "h-4 w-1.5 bg-cream/30 hover:bg-cream/50"}`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 lg:hidden">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-4 bg-cream/30 hover:bg-cream/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Search (writes to the shared filter hook) ─── */
function SearchBar({ filtersApi }: { filtersApi: UseExhibitionFiltersResult }) {
  const { filters, setCountry, setMonth, setCategory, setQuery, reset, filtered, activeFilterCount } = filtersApi;

  return (
    <section className="relative z-10 -mt-6 px-6">
      <div className="mx-auto max-w-6xl rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 md:grid-cols-4">
          <Field icon={Globe2} label="Country">
            <select
              value={filters.country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal outline-none"
            >
              <option>{ALL_COUNTRIES}</option>
              {COUNTRY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field icon={Calendar} label="Month">
            <select
              value={filters.month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal outline-none"
            >
              <option>{ALL_MONTHS}</option>
              {MONTH_OPTIONS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field icon={BookOpen} label="Category">
            <select
              value={filters.category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal outline-none"
            >
              <option>{ALL_CATEGORIES}</option>
              {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by fair, city or venue…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="text-xs text-muted-foreground">
            {filtered.length} of {EXHIBITIONS.length} exhibitions match
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-navy hover:bg-muted transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <label className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5">
      <Icon className="h-4 w-4 text-gold shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
        {children}
      </div>
    </label>
  );
}

/* ─── Featured Exhibitions (8 at a time, Load more) ─── */
const PAGE_SIZE = 8;

function FeaturedExhibitions({ filtersApi }: { filtersApi: UseExhibitionFiltersResult }) {
  const { filtered } = filtersApi;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Whenever the filtered set changes (new search/filter), start over at 8.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filtered]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;

  return (
    <section id="exhibitions" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHead
        eyebrow="Live listings"
        title="Exhibitions"
        subtitle="Filtered results update as you search above."
      />

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No exhibitions match those filters. Try clearing one of them.
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {visible.map((e) => (
              <ExhibitionCard key={e.id} data={e} />
            ))}
          </div>

          {remaining > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-md border border-border px-6 py-2.5 text-sm font-semibold text-navy hover:bg-muted transition-colors"
              >
                Load 8 more ({remaining} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ExhibitionCard({ data }: { data: Exhibition }) {
  const hasAnyStat = data.visitors || data.publishers || data.booths;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
        <img src={data.image} alt={data.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-md bg-navy/85 px-2 py-1 text-xs font-medium text-cream">
          <span className="text-sm leading-none">{data.flag}</span> {data.country}
        </div>
        <div className={`absolute right-2 top-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
          data.status === "confirmed" ? "bg-gold text-navy" : "bg-cream/90 text-charcoal"
        }`}>
          {data.status === "confirmed" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {data.statusLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg leading-tight text-navy">{data.title}</h3>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {data.cityKnown ? data.city : "City to be announced"} · {data.venueKnown ? data.venue : "Venue to be announced"}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-gold shrink-0" /> {data.dateLabel}
        </div>

        {hasAnyStat && (
          <div className="grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
            {data.visitors && <Stat icon={Users} label="Visitors" value={data.visitors} />}
            {data.publishers && <Stat icon={Building2} label="Publishers" value={String(data.publishers)} />}
            {data.booths && <Stat icon={Ticket} label="Booths" value={String(data.booths)} />}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {data.categories.slice(0, 4).map((c) => (
            <span key={c} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium capitalize text-charcoal/80">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <Link
            to={`/exhibitions/${data.slug}`}
            className="flex-1 rounded-md border border-border px-3 py-2 text-center text-xs font-semibold text-navy hover:bg-muted transition-colors"
          >
            View details
          </Link>
          <Link
            to={`/register?fair=${data.slug}`}
            className="flex-1 rounded-md bg-navy px-3 py-2 text-center text-xs font-semibold text-cream hover:bg-navy-deep transition-colors"
          >
            Apply
          </Link>
        </div>
      </div>
    </article>
  );
}

function Stat({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div>
      <Icon className="mx-auto h-3.5 w-3.5 text-gold" />
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

/* ─── Timeline (grouped by month, from real data) ─── */
function Timeline({ filtersApi }: { filtersApi: UseExhibitionFiltersResult }) {
  const { filtered } = filtersApi;

  const groups = new Map<string, Exhibition[]>();
  filtered.forEach((e) => {
    const key = e.monthLabel ?? "Date to be confirmed";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(e);
  });

  return (
    <section id="timeline" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHead eyebrow="Calendar" title="Exhibition timeline" subtitle="Every fair in the current results, grouped by month." />

      {groups.size === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No exhibitions match the current filters.
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {Array.from(groups.entries()).map(([month, events]) => (
            <div key={month}>
              <div className="text-xs font-semibold uppercase tracking-wide text-gold">{month}</div>
              <ol className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
                {events.map((e) => (
                  <li key={e.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 shrink-0 text-2xl">{e.flag}</div>
                      <div>
                        <div className="font-display text-lg text-navy">{e.title}</div>
                        <div className="text-sm text-charcoal/70">
                          {e.cityKnown ? `${e.city}, ` : ""}{e.country} · {e.dateLabel}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/exhibitions/${e.slug}`}
                      className="inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-navy hover:bg-muted transition-colors sm:self-auto"
                    >
                      Details <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── Why Exhibit ─── */
function WhyExhibit() {
  const benefits: string[] = [
    "Meet international publishers", "Sell translation rights",
    "Expand worldwide distribution", "Network with literary agents",
    "Meet readers face-to-face", "Gain media exposure",
    "Apply for publishing awards",
  ];
  return (
    <section id="why-exhibit" className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <img
        src={authorSigning}
        alt="Author signing books at an international book fair"
        loading="lazy" width={1200} height={1400}
        className="aspect-[4/5] w-full rounded-lg border border-border object-cover"
      />
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-gold">Why exhibit</span>
        <h2 className="mt-2 font-display text-3xl leading-tight text-navy sm:text-4xl">
          Reach publishers who only attend a handful of fairs each year
        </h2>
        <p className="mt-4 max-w-lg text-charcoal/70">
          Applying directly through organizer websites means tracking dozens of deadlines by hand.
          This directory keeps them in one calendar and lets you apply from a single profile.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 rounded-md border border-border bg-card p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="text-sm font-medium text-charcoal">{b}</span>
            </li>
          ))}
        </ul>
        <a href="#exhibitions" className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy-deep transition-colors">
          Browse exhibitions <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ─── Platform Benefits ─── */
interface Benefit { icon: LucideIcon; title: string; desc: string; }
const BENEFITS: Benefit[] = [
  { icon: Globe2, title: "Worldwide event database", desc: "Every major fair, festival and publishing expo, kept current." },
  { icon: Handshake, title: "Publisher connections", desc: "Direct outreach to acquiring editors and rights managers." },
  { icon: BadgeCheck, title: "Author profiles", desc: "A verifiable listing that publishers and organizers can review." },
  { icon: BookMarked, title: "Book catalog", desc: "Covers, samples, ISBNs and rights status in one place." },
  { icon: Languages, title: "Translation rights", desc: "Match with foreign publishers seeking translation rights." },
  { icon: Trophy, title: "Award submissions", desc: "Apply to international literary prizes from one dashboard." },
  { icon: CalendarClock, title: "Event calendar", desc: "A single international calendar, synced to your timezone." },
  { icon: LayoutGrid, title: "Digital showcase", desc: "A standing listing page for each of your titles." },
  { icon: Ticket, title: "Booth reservations", desc: "Reserve and manage exhibitor booths across events." },
  { icon: MessagesSquare, title: "Rights negotiation", desc: "In-app messaging for meetings and rights discussions." },
];

function PlatformBenefits() {
  return (
    <section id="platform" className="bg-navy py-20 text-cream">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead dark eyebrow="Platform" title="What the directory includes" subtitle="Everything needed to find, apply to and manage exhibitions." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-lg border border-cream/15 bg-navy-deep/30 p-5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold">
                <b.icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-3 font-display text-base">{b.title}</h3>
              <p className="mt-1 text-sm text-cream/65">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
interface Testimonial { name: string; role: string; quote: string; }
const TESTIMONIALS: Testimonial[] = [
  { name: "Amelia Hart", role: "Debut novelist, UK", quote: "I signed with a publisher two weeks after exhibiting at a fair I found through this directory." },
  { name: "Daniel Okafor", role: "Publisher, Lagos Press", quote: "Having every fair's dates in one calendar saved us from missing two application windows last year." },
  { name: "Sana Iqbal", role: "Literary agent, Karachi", quote: "Every fair, every deadline, in one place. Nothing else comes close for keeping track." },
];

function Testimonials() {
  return (
    <section id="testimonials" className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead centered eyebrow="From the platform" title="Authors, agents and publishers" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col justify-between rounded-lg border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-gold/60" />
              <blockquote className="mt-3 font-display text-lg leading-snug text-navy">"{t.quote}"</blockquote>
              <figcaption className="mt-6">
                <div className="text-sm font-semibold text-navy">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CtaBanner() {
  return (
    <section className="border-y border-border bg-navy-deep text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Register your book and start applying</h2>
            <p className="mt-3 text-cream/75">
              Join authors and publishers already using this directory to find and apply to fairs worldwide.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold/90 transition-colors">
              Register book <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#exhibitions" className="inline-flex items-center gap-2 rounded-md border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-cream/10 transition-colors">
              Explore exhibitions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
export function Footer() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Directory",
      links: [
        { label: "Exhibitions", href: "/#exhibitions" },
        { label: "Calendar", href: "/#timeline" },
        { label: "Why Exhibit", href: "/#why-exhibit" },
        { label: "Platform", href: "/#platform" },
        { label: "Reviews", href: "/#testimonials" },
      ],
    },
    {
      title: "Authors",
      links: [{ label: "Register your book", href: "/register" }],
    },
    {
      title: "Stay updated",
      links: [{ label: "Newsletter", href: "#" }],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
      ],
    },
  ];
  return (
    <footer className="bg-navy-deep text-cream/80">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logofoot} className="w-55" alt="Global Book Fair" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-cream/60">
              A directory connecting book fairs, publishers, authors and readers worldwide.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-md border border-cream/15 text-cream/70 hover:border-gold hover:text-gold transition-colors" aria-label="Social">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-semibold uppercase tracking-wide text-gold">{c.title}</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Global Book Fair. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Shared bits ─── */
function SectionHead({ eyebrow, title, subtitle, centered, dark }: {
  eyebrow: string; title: ReactNode; subtitle?: string; centered?: boolean; dark?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className="max-w-2xl">
        <span className={`text-xs font-semibold uppercase tracking-wide ${dark ? "text-gold/80" : "text-gold"}`}>{eyebrow}</span>
        <h2 className={`mt-2 font-display text-3xl leading-tight sm:text-4xl ${dark ? "text-cream" : "text-navy"}`}>{title}</h2>
        {subtitle && <p className={`mt-3 text-base ${dark ? "text-cream/70" : "text-charcoal/70"}`}>{subtitle}</p>}
      </div>
    </div>
  );
}