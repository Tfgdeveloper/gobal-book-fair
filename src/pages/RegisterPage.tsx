import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

import { EXHIBITIONS, CATEGORY_OPTIONS, getExhibitionBySlug } from "../data/adaptExhibitions";
import { Nav, Footer } from "./HomePage";

type Role = "author" | "publisher";

interface FormState {
  role: Role;
  fullName: string;
  email: string;
  bookTitle: string;
  category: string;
  exhibitionSlug: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  role: "author",
  fullName: "",
  email: "",
  bookTitle: "",
  category: "",
  exhibitionSlug: "",
  notes: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get("fair") ?? "";
  const preselectedExhibition = preselectedSlug ? getExhibitionBySlug(preselectedSlug) : undefined;

  const [form, setForm] = useState<FormState>({
    ...EMPTY_FORM,
    exhibitionSlug: preselectedExhibition ? preselectedExhibition.slug : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(f: FormState): Partial<Record<keyof FormState, string>> {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!f.fullName.trim()) next.fullName = "Enter your full name.";
    if (!f.email.trim()) next.email = "Enter an email address.";
    else if (!EMAIL_RE.test(f.email.trim())) next.email = "Enter a valid email address.";
    if (!f.bookTitle.trim()) next.bookTitle = "Enter the title of the book.";
    if (!f.exhibitionSlug) next.exhibitionSlug = "Choose an exhibition to apply to.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend yet — this is where a real submission would go, e.g.:
    //
    //   await fetch("/api/registrations", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    //
    // For now we just show a confirmation state.
    setSubmitted(true);
  }

  const selectedExhibition = useMemo(
    () => (form.exhibitionSlug ? getExhibitionBySlug(form.exhibitionSlug) : undefined),
    [form.exhibitionSlug]
  );

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream text-charcoal">
        <Nav />
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-display text-3xl text-navy">Application received</h1>
          <p className="mt-3 text-charcoal/70">
            Thanks, {form.fullName.split(" ")[0]}. We've recorded your application
            {selectedExhibition ? <> for <strong>{selectedExhibition.title}</strong></> : ""}.
            You'll hear back at <span className="font-medium text-charcoal">{form.email}</span>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy-deep transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to exhibitions
            </Link>
            <button
              onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-navy hover:bg-muted transition-colors"
            >
              Submit another application
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <Nav />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to exhibitions
        </Link>

        <h1 className="mt-6 font-display text-3xl text-navy sm:text-4xl">Register your book</h1>
        <p className="mt-3 text-charcoal/70">
          Tell us about yourself and the exhibition you'd like to apply to. We'll follow up by email.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
          {/* Role */}
       

          {/* Full name */}
          <TextField
            label="Full name"
            value={form.fullName}
            onChange={(v) => set("fullName", v)}
            error={errors.fullName}
            placeholder="Amelia Hart"
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => set("email", v)}
            error={errors.email}
            placeholder="you@example.com"
          />

          {/* Book title */}
          <TextField
            label="Book title"
            value={form.bookTitle}
            onChange={(v) => set("bookTitle", v)}
            error={errors.bookTitle}
            placeholder="The name of the book you're exhibiting"
          />

          {/* Category */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-charcoal outline-none"
            >
              <option value="">Select a category (optional)</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </select>
          </div>

          {/* Exhibition */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Exhibition</label>
            <select
              value={form.exhibitionSlug}
              onChange={(e) => set("exhibitionSlug", e.target.value)}
              className={`mt-2 w-full rounded-md border bg-card px-3 py-2.5 text-sm text-charcoal outline-none ${
                errors.exhibitionSlug ? "border-red-400" : "border-border"
              }`}
            >
              <option value="">Choose an exhibition…</option>
              {EXHIBITIONS.map((ex) => (
                <option key={ex.slug} value={ex.slug}>
                  {ex.title} — {ex.dateLabel}
                </option>
              ))}
            </select>
            {errors.exhibitionSlug && <FieldError message={errors.exhibitionSlug} />}
            {selectedExhibition && (
              <p className="mt-2 text-xs text-muted-foreground">
                {selectedExhibition.flag} {selectedExhibition.cityKnown ? `${selectedExhibition.city}, ` : ""}
                {selectedExhibition.country} · {selectedExhibition.statusLabel}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Anything else? <span className="normal-case text-muted-foreground/70">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              placeholder="Booth preferences, translation rights you're offering, etc."
              className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold/90 transition-colors sm:w-auto"
          >
            Submit application <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}

function TextField({
  label, value, onChange, error, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-md border bg-card px-3 py-2.5 text-sm text-charcoal outline-none placeholder:text-muted-foreground ${
          error ? "border-red-400" : "border-border"
        }`}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
      <AlertCircle className="h-3.5 w-3.5" /> {message}
    </p>
  );
}