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
      <section className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              AxleWay Car Rental
            </p>
            <h1 className="section-title">
              Rent the right car for every city plan.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Browse verified cars, check details, book quickly, and manage your own listings from one clean dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="primary-button" href="/cars">
                Explore Cars
              </Link>
              <Link className="primary-button secondary-button" href="/add-car">
                Add Car
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] p-3">
            <img
              className="h-[360px] w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
              alt="Premium rental car"
            />
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
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--highlight)] text-lg font-black text-[var(--ink)]">
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--highlight)]">
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
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/8 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--action)] font-black">
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
