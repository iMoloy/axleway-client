"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

const demoCars = [
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
  },
  {
    id: "nova-sedan",
    name: "Nova Sedan",
    type: "Sedan",
    price: 52,
    seats: 5,
    location: "Mohakhali",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "trailmax-suv",
    name: "TrailMax SUV",
    type: "SUV",
    price: 82,
    seats: 7,
    location: "Bashundhara",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "spark-mini",
    name: "Spark Mini",
    type: "Hatchback",
    price: 32,
    seats: 4,
    location: "Badda",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pulse-ev",
    name: "Pulse EV",
    type: "Electric",
    price: 68,
    seats: 5,
    location: "Niketan",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "regal-cruiser",
    name: "Regal Cruiser",
    type: "Luxury",
    price: 125,
    seats: 4,
    location: "Baridhara",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "tourline-microbus",
    name: "TourLine Microbus",
    type: "Microbus",
    price: 95,
    seats: 11,
    location: "Khilgaon",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "civic-route",
    name: "Civic Route",
    type: "Sedan",
    price: 50,
    seats: 5,
    location: "Farmgate",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "harbor-suv",
    name: "Harbor SUV",
    type: "SUV",
    price: 78,
    seats: 7,
    location: "Lalmatia",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "swift-hatch",
    name: "Swift Hatch",
    type: "Hatchback",
    price: 38,
    seats: 4,
    location: "Shantinagar",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "leafline-ev",
    name: "Leafline EV",
    type: "Electric",
    price: 64,
    seats: 5,
    location: "Tejgaon",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "velvet-prime",
    name: "Velvet Prime",
    type: "Luxury",
    price: 135,
    seats: 4,
    location: "Gulshan 2",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "crewway-microbus",
    name: "CrewWay Microbus",
    type: "Microbus",
    price: 92,
    seats: 12,
    location: "Jatrabari",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "campus-sedan",
    name: "Campus Sedan",
    type: "Sedan",
    price: 44,
    seats: 5,
    location: "Mohammadpur",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "northstar-suv",
    name: "Northstar SUV",
    type: "SUV",
    price: 84,
    seats: 7,
    location: "Uttara Sector 7",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80"
  }
];

const ITEMS_PER_PAGE = 6;

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Microbus"];
const availabilityOptions = ["All", "Available", "Unavailable"];

const controlClass =
  "h-12 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";

export default function CarsPage() {
  const [cars, setCars] = useState(demoCars);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [loading, setLoading] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, type, availability]);

  useEffect(() => {
    let ignore = false;

    async function loadCars() {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (type !== "All") query.set("type", type);

      try {
        setLoading(true);
        const data = await apiFetch(`/cars?${query.toString()}`);
        if (!ignore) {
          setCars(Array.isArray(data) ? data : []);
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
  }, [search, type]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name?.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "All" || car.type === type;
      const matchesAvailability = availability === "All" || car.availability === availability;

      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [availability, search, type, cars]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const currentCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        <div className="flex flex-wrap gap-2">
          {usingDemoData ? (
            <p className="rounded-lg bg-[var(--highlight)] px-4 py-2 text-sm font-bold text-[var(--ink)]">
              Demo fleet
            </p>
          ) : null}
          <p className="rounded-lg bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent-dark)]">
            {loading ? "Loading cars" : `${filteredCars.length} cars found`}
          </p>
        </div>
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

      {currentCars.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {currentCars.map((car) => (
            <article
              key={car._id || car.id}
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
                  <Link className="primary-button w-full" href={`/cars/${car._id || car.id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] font-bold transition hover:bg-[var(--line)] disabled:opacity-50 disabled:hover:bg-[var(--panel)]"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border font-bold transition ${
                  currentPage === i + 1
                    ? "border-[var(--action)] bg-[var(--action)] text-white"
                    : "border-[var(--line)] bg-[var(--panel)] hover:bg-[var(--line)]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] font-bold transition hover:bg-[var(--line)] disabled:opacity-50 disabled:hover:bg-[var(--panel)]"
            >
              &gt;
            </button>
          </div>
        )}
      ) : (
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel)] p-8 text-center text-[var(--muted)]">
          No cars match your search.
        </div>
      )}
    </section>
  );
}
