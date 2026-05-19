"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const demoCars = [
  {
    id: "aero-sedan",
    name: "Aero Sedan",
    type: "Sedan",
    price: 48,
    location: "Dhaka Airport",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "metro-suv",
    name: "Metro SUV",
    type: "SUV",
    price: 72,
    location: "Gulshan",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "city-hatch",
    name: "City Hatch",
    type: "Hatchback",
    price: 36,
    location: "Dhanmondi",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "orbit-electric",
    name: "Orbit Electric",
    type: "Electric",
    price: 62,
    location: "Banani",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "summit-luxury",
    name: "Summit Luxury",
    type: "Luxury",
    price: 110,
    location: "Uttara",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "family-microbus",
    name: "Family Microbus",
    type: "Microbus",
    price: 88,
    location: "Mirpur",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
  }
];

export function AvailableCarsPreview() {
  const [cars, setCars] = useState(demoCars);
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadCars() {
      try {
        setLoading(true);
        const data = await apiFetch("/cars");
        if (!ignore) {
          setCars(Array.isArray(data) && data.length ? data.slice(0, 6) : []);
          setUsingDemoData(false);
        }
      } catch {
        if (!ignore) {
          setCars(demoCars);
          setUsingDemoData(true);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCars();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="border-y border-[var(--line)] bg-[var(--panel)] py-14">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold">Available Cars</h2>
            <p className="mt-2 text-[var(--muted)]">A quick preview of the fleet renters can explore.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {usingDemoData ? (
              <span className="rounded-lg bg-[var(--highlight)] px-3 py-2 text-xs font-bold text-[var(--ink)]">
                Demo preview
              </span>
            ) : null}
            <span className="rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-xs font-bold text-[var(--accent-dark)]">
              {loading ? "Loading cars" : `${cars.length} shown`}
            </span>
            <Link className="font-bold text-[var(--accent)]" href="/cars">
              View all cars
            </Link>
          </div>
        </div>

        {cars.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <article
                key={car._id || car.id || car.name}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm"
              >
                <img className="h-48 w-full object-cover" src={car.image} alt={car.name} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-sm text-[var(--muted)]">{car.type} · {car.location}</p>
                    </div>
                    <p className="font-bold text-[var(--action)]">${car.price}/day</p>
                  </div>
                  <Link className="primary-button mt-5" href={`/cars/${car._id || car.id}`}>
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--line)] p-8 text-center text-[var(--muted)]">
            No cars are available right now.
          </div>
        )}
      </div>
    </section>
  );
}

