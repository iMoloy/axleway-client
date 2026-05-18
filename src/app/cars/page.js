"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const cars = [
  {
    id: "aero-sedan",
    name: "Aero Sedan",
    type: "Sedan",
    price: 48,
    seats: 5,
    location: "Dhaka Airport",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "metro-suv",
    name: "Metro SUV",
    type: "SUV",
    price: 72,
    seats: 7,
    location: "Gulshan",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "city-hatch",
    name: "City Hatch",
    type: "Hatchback",
    price: 36,
    seats: 4,
    location: "Dhanmondi",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "orbit-electric",
    name: "Orbit Electric",
    type: "Electric",
    price: 62,
    seats: 5,
    location: "Banani",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "summit-luxury",
    name: "Summit Luxury",
    type: "Luxury",
    price: 110,
    seats: 4,
    location: "Uttara",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "family-microbus",
    name: "Family Microbus",
    type: "Microbus",
    price: 88,
    seats: 10,
    location: "Mirpur",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
  }
];

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Microbus"];
const availabilityOptions = ["All", "Available", "Unavailable"];

const controlClass =
  "h-12 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";

export default function CarsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [availability, setAvailability] = useState("All");

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "All" || car.type === type;
      const matchesAvailability = availability === "All" || car.availability === availability;

      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [availability, search, type]);

  return (
    <section className="container py-12 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Explore fleet
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Find your next rental car</h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Search by car name and filter by type or availability before opening the details page.
          </p>
        </div>
        <p className="rounded-lg bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent-dark)]">
          {filteredCars.length} cars found
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 md:grid-cols-[1fr_190px_190px]">
        <input
          className={controlClass}
          placeholder="Search by car name"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className={controlClass} value={type} onChange={(event) => setType(event.target.value)}>
          {carTypes.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Types" : option}
            </option>
          ))}
        </select>
        <select
          className={controlClass}
          value={availability}
          onChange={(event) => setAvailability(event.target.value)}
        >
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "Any Status" : option}
            </option>
          ))}
        </select>
      </div>

      {filteredCars.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <article
              key={car.id}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm"
            >
              <img className="h-52 w-full object-cover" src={car.image} alt={car.name} />
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{car.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                      {car.type} · {car.seats} seats
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-dark)]">
                    {car.availability}
                  </span>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--muted)]">Pickup</span>
                    <span className="font-bold">{car.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--muted)]">Rent</span>
                    <span className="text-lg font-black text-[var(--action)]">${car.price}/day</span>
                  </div>
                  <Link className="primary-button w-full" href={`/cars/${car.id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel)] p-8 text-center text-[var(--muted)]">
          No cars match your search.
        </div>
      )}
    </section>
  );
}
