"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AvailableCarsPreview } from "@/components/AvailableCarsPreview";
import { apiFetch } from "@/lib/api";

const renterBenefits = [
  {
    title: "Transparent Pricing",
    text: "No hidden service fees. You pay the exact daily rent price specified by the owner.",
  },
  {
    title: "Verified Vehicles",
    text: "Every car listing goes through verification to ensure safety, cleanliness, and road readiness.",
  },
  {
    title: "Flexible Options",
    text: "Customize your rent request by choosing your pickup location and whether you need a driver.",
  },
];

const hostBenefits = [
  {
    title: "Passive Income",
    text: "Turn your idle vehicle into weekly income. Set your daily price and watch your earnings grow.",
  },
  {
    title: "Complete Control",
    text: "Review booking requests, select who rents your car, and manage calendar availability.",
  },
  {
    title: "Secure Platform",
    text: "Communicate with verified renters and track your active bookings from your dashboard.",
  },
];

const faqs = [
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You will need a valid driver's license, a national identity card (NID), and a profile photo. The pickup location will be coordinates specified in the car description.",
  },
  {
    question: "How do I list my car and start earning?",
    answer:
      "Create an account, go to the 'Add Car' page, fill in your vehicle details (pickup location, price, image URL, type, seats), and click submit. It goes live instantly.",
  },
  {
    question: "Is there support for booking cancellations?",
    answer:
      "Yes, you can cancel your booking from 'My Bookings' page if the trip schedule changes. We recommend notifying the owner as early as possible.",
  },
  {
    question: "How do I contact the car owner/renter?",
    answer:
      "Once a booking request is made, you can view the contact and pickup details, coordinates, and notes directly inside your dashboard.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);

  // Dynamic stats from the database
  const [stats, setStats] = useState({ carCount: 0, cityCount: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const cars = await apiFetch("/cars");
        const carCount = cars.length;
        const uniqueCities = new Set(
          cars.map((c) => c.location?.split(",")[0]?.trim()),
        );
        setStats({ carCount, cityCount: uniqueCities.size });
      } catch {
        // keep defaults on error
      }
    }
    loadStats();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-[var(--line)]">
        <div className="container py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left: Text content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                  Premium Car Rental Platform
                </span>
              </div>
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                Rent verified cars, <br />
                or host and earn.
              </h1>
              <p className="mt-6 text-base leading-7 text-[var(--muted)] md:text-lg">
                AxleWay connects trusted owners with verified renters. Explore
                hundreds of reliable cars or start hosting your own today.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  className="rounded-md bg-[var(--accent)] px-6 py-3.5 text-sm font-bold !text-white shadow-md shadow-blue-500/10 transition hover:bg-[var(--accent-dark)]"
                  href="/cars"
                >
                  Explore Cars →
                </Link>
                <Link
                  className="rounded-md border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--panel-soft)]"
                  href="/add-car"
                >
                  List Your Car
                </Link>
              </div>

              {/* Stats Row — numbers come from the live database */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-[var(--line)] pt-8">
                <div>
                  <p className="text-2xl font-black">
                    {stats.carCount > 0 ? `${stats.carCount}+` : "…"}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Verified Cars
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black">100%</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Trusted Hosts
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black">
                    {stats.cityCount > 0 ? `${stats.cityCount}+` : "…"}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Major Cities
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Car image */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white p-2 shadow-xl">
                <img
                  className="h-[400px] w-full rounded-md object-cover"
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium car rental"
                />
              </div>

              {/* Floating Price Badge */}
              <div className="absolute -bottom-4 -left-4 rounded-md border border-[var(--line)] bg-white p-4 shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Premium Fleet
                </p>
                <p className="mt-1 text-lg font-black text-[var(--accent)]">
                  From $35/day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Cars Grid Preview */}
      <AvailableCarsPreview />

      {/* Why Choose AxleWay Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            One platform. Built for both sides.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Renters Column */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-8">
            <h3 className="text-xl font-black text-[var(--accent)]">
              For Renters
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Looking for a smooth ride? Renting has never been easier.
            </p>

            <div className="mt-8 space-y-6">
              {renterBenefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--foreground)]">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hosts Column */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-8">
            <h3 className="text-xl font-black text-[var(--foreground)]">
              For Car Owners
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Have an extra vehicle? List it and earn passive income safely.
            </p>

            <div className="mt-8 space-y-6">
              {hostBenefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-800">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--foreground)]">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Banner */}
      <section className="border-t border-[var(--line)] bg-white py-12">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">🛡️</span>
              <div>
                <h4 className="font-bold text-sm">Verified Listings</h4>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  All owner listings are verified before they go live.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🔑</span>
              <div>
                <h4 className="font-bold text-sm">Secure Renting</h4>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Secure JWT token auth protects user dashboards & bookings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">💬</span>
              <div>
                <h4 className="font-bold text-sm">Direct Notes</h4>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Communicate pickup instructions & custom requirements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <h4 className="font-bold text-sm">Help & Support</h4>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Reach our help center anytime for any trip issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-[var(--line)] bg-[var(--ink)] py-16 text-white md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Support Center
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-md border border-white/5 bg-white/5 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white hover:bg-white/5"
                    type="button"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[var(--accent)] text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-white/70 border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
