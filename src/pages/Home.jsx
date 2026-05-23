import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AvailableCarsPreview } from "@/components/AvailableCarsPreview";
import { apiFetch } from "@/lib/api";

const heroImages = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80", // White sports car
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1920&q=80", // Red car (working)
  "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=80", // White modern car
];

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dynamic stats from the database
  const [stats, setStats] = useState({ carCount: 0, cityCount: 0 });

  useEffect(() => {
    // Background slider interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden border-b border-[var(--line)] bg-black">
        {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Hero Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/65" />
          </motion.div>
        </AnimatePresence>

        {/* Foreground Text Content (Centered) */}
        <div className="container relative z-10 py-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] drop-shadow-md">
                Premium Car Rental Platform
              </span>
            </div>
            
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
              Rent verified cars, <br />
              or host and earn.
            </h1>
            
            <p className="mt-6 text-base leading-7 text-gray-300 md:text-lg drop-shadow-md">
              AxleWay connects trusted owners with verified renters. Explore
              hundreds of reliable cars or start hosting your own today.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                className="rounded-md bg-[var(--accent)] px-8 py-4 text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95"
                to="/cars"
              >
                Explore Cars →
              </Link>
              <Link
                className="rounded-md border border-white bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-gray-100 hover:scale-105 active:scale-95"
                to="/add-car"
              >
                List Your Car
              </Link>
            </div>
          </motion.div>

          {/* Stats Row — numbers come from the live database */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-12 rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-md shadow-2xl"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-white drop-shadow-md">
                {stats.carCount > 0 ? `${stats.carCount}+` : "…"}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Verified Cars
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-white drop-shadow-md">100%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Trusted Hosts
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-white drop-shadow-md">
                {stats.cityCount > 0 ? `${stats.cityCount}+` : "…"}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Major Cities
              </p>
            </div>
          </motion.div>
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
