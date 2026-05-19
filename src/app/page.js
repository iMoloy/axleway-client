import Link from "next/link";
import { AvailableCarsPreview } from "@/components/AvailableCarsPreview";

const featureCards = [
  {
    title: "Verified listings",
    text: "Each listing keeps rent, seat count, pickup location, and availability in one quick scan."
  },
  {
    title: "Owner controls",
    text: "Car owners can prepare listings, edit details, and manage availability from a focused dashboard."
  },
  {
    title: "Booking clarity",
    text: "Renters can review price, driver request, booking date, and trip notes before confirming."
  }
];

const steps = [
  "Choose a car that matches your route",
  "Check pickup location and daily rent",
  "Send booking details with driver preference",
  "Track the request from My Bookings"
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.08),transparent)]" />

        <div className="container relative py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left: Text content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                  Premium Car Rental Platform
                </span>
              </div>

              <h1 className="section-title text-[var(--foreground)]">
                Rent the right car,<br />
                <span className="text-[var(--accent)]">every journey.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">
                Browse verified listings, check availability, and book in minutes. The cleanest rental experience—designed for real roads.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-bold !text-white shadow-lg shadow-blue-500/25 transition hover:bg-[var(--accent-dark)]"
                  href="/cars"
                >
                  Explore Cars →
                </Link>
                <Link
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  href="/add-car"
                >
                  List Your Car
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[var(--line)] pt-8">
                <div>
                  <p className="text-2xl font-black text-[var(--foreground)]">20+</p>
                  <p className="text-sm text-[var(--muted)]">Verified Cars</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--foreground)]">100%</p>
                  <p className="text-sm text-[var(--muted)]">Trusted Owners</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--foreground)]">6+</p>
                  <p className="text-sm text-[var(--muted)]">Cities Covered</p>
                </div>
              </div>
            </div>

            {/* Right: Car image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-[var(--accent-soft)] opacity-50 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-2 shadow-2xl shadow-blue-100">
                <img
                  className="h-[400px] w-full rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium rental car"
                />
                {/* Floating price badge */}
                <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm">
                  <p className="text-xs font-bold text-[var(--muted)]">Starting from</p>
                  <p className="text-xl font-black text-[var(--accent)]">$35 <span className="text-sm font-semibold text-[var(--muted)]">/ day</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AvailableCarsPreview />

      <section className="container py-14 md:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
            Built for rental flow
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Everything feels close to the road.</h2>
          <p className="mt-3 text-[var(--muted)]">
            AxleWay keeps the experience direct, so renters and owners can move without hunting through cluttered screens.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--accent-soft)] text-lg font-black text-[var(--accent)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-[var(--muted)]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--ink)] py-14 text-white md:py-20">
        <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Pickup workflow
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">From search to steering wheel in four clear steps.</h2>
            <p className="mt-4 leading-7 text-white/75">
              The interface is shaped around real rental decisions: location, price, availability, and booking context.
            </p>
          </div>

          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--accent)] font-black text-white">
                  {index + 1}
                </span>
                <p className="font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
