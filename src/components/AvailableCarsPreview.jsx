import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function AvailableCarsPreview() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadCars() {
      try {
        const data = await apiFetch("/cars");
        if (!ignore) {
          setCars(Array.isArray(data) && data.length ? data.slice(0, 6) : []);
        }
      } catch {
        if (!ignore) setCars([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadCars();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="border-y border-[var(--line)] bg-[var(--panel-soft)] py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Our Fleet
            </p>
            <h2 className="mt-2 text-3xl font-black">Available Cars</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Browse our top picks — updated in real time.
            </p>
          </div>
          <Link
            href="/cars"
            className="text-sm font-bold text-[var(--accent)] hover:underline"
          >
            View all cars →
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-md bg-[var(--line)]"
              />
            ))}
          </div>
        )}

        {/* Cars grid */}
        {!loading && cars.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <article
                key={car._id || car.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                    src={car.image}
                    alt={car.name}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">
                        {car.type} · {car.location}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-md bg-[var(--accent-soft)] px-2 py-1 text-sm font-black text-[var(--accent)]">
                      ${car.price}
                      <span className="text-xs font-medium">/day</span>
                    </span>
                  </div>
                  <Link
                    className="mt-5 rounded-md bg-[var(--accent)] py-2.5 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95"
                    href={`/cars/${car._id || car.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && cars.length === 0 && (
          <div className="rounded-lg border border-dashed border-[var(--line)] p-10 text-center text-[var(--muted)]">
            No cars available right now.
          </div>
        )}
      </div>
    </section>
  );
}
