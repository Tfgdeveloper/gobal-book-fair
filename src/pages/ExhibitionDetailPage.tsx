import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Calendar, MapPin, CheckCircle2, Clock, ArrowRight,
  Users, ArrowUpRight
} from "lucide-react";

import { getExhibitionBySlug, EXHIBITIONS } from "../data/adaptExhibitions";
import { Nav, Footer } from "./HomePage";

export default function ExhibitionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const exhibition = slug ? getExhibitionBySlug(slug) : undefined;

  useEffect(() => {
    document.title = exhibition ? `${exhibition.title} — Global Book Fair` : "Exhibition not found";
  }, [exhibition]);

  if (!exhibition) {
    return (
      <main className="min-h-screen bg-cream text-charcoal">
        <Nav />
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-navy">Exhibition not found</h1>
          <p className="mt-3 text-charcoal/70">
            {slug ? `There's no listing for "${slug}".` : "No exhibition was specified."} It may have
            been removed, or the link is out of date.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy-deep transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all exhibitions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const e = exhibition;
  const related = EXHIBITIONS.filter((x) => x.country === e.country && x.slug !== e.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <Nav />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-navy text-cream">
        <img src={e.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/80 to-navy-deep/40" />
        <div className="relative mx-auto max-w-5xl px-6 py-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-cream/70 hover:text-cream transition-colors">
            <ArrowLeft className="h-4 w-4" /> All exhibitions
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-cream/25 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cream/80">
              {e.flag} {e.cityKnown ? `${e.city}, ` : ""}{e.country}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold ${
              e.status === "confirmed" ? "bg-gold text-navy" : e.status === "verified" ? "bg-cream text-navy" : "bg-cream/90 text-charcoal"
            }`}>
              {e.status === "confirmed" || e.status === "verified"
                ? <CheckCircle2 className="h-3.5 w-3.5" />
                : <Clock className="h-3.5 w-3.5" />}
              {e.statusLabel}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">{e.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/80">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold" /> {e.dateLabel}</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" /> {e.venueKnown ? e.venue : "Venue to be announced"}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-xl text-navy">About this exhibition</h2>
            <p className="mt-3 leading-relaxed text-charcoal/75">{e.description}</p>

            

            {e.highlights.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gold">Highlights</h3>
                <ul className="mt-3 space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {e.audience.length > 0 && (
              <div className="mt-8">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
                  <Users className="h-3.5 w-3.5" /> Who attends
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.audience.map((a) => (
                    <span key={a} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium capitalize text-charcoal/80">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {e.categories.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gold">Categories</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {e.categories.map((c) => (
                    <span key={c} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium capitalize text-charcoal/80">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

        
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-lg border border-border bg-card p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick facts</div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Country</dt>
                <dd className="text-right font-medium text-charcoal">{e.flag} {e.country}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">City</dt>
                <dd className="text-right font-medium text-charcoal">{e.cityKnown ? e.city : "To be announced"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Venue</dt>
                <dd className="text-right font-medium text-charcoal">{e.venueKnown ? e.venue : "To be announced"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Dates</dt>
                <dd className="text-right font-medium text-charcoal">{e.dateLabel}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="text-right font-medium text-charcoal">{e.statusLabel}</dd>
              </div>
            </dl>

            

            <Link
              to={`/register?fair=${e.slug}`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-navy hover:bg-gold/90 transition-colors"
            >
              Apply to exhibit <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-xl text-navy">Also in {e.country}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/exhibitions/${r.slug}`}
                  className="group rounded-lg border border-border bg-card p-4 hover:border-gold/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-display text-base text-navy">{r.title}</div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{r.dateLabel}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}