import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiFetch } from "@/lib/api";

const ITEMS_PER_PAGE = 6;
const carTypes = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Microbus",
];
const availabilityOptions = ["All", "Available", "Unavailable"];

const controlClass =
  "h-12 rounded-md border border-[var(--line)] bg-white px-4 text-sm font-semibold text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";

export default function Cars() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initial state comes from URL so shared/bookmarked links work
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "All");
  const [availability, setAvailability] = useState(
    searchParams.get("availability") || "All",
  );

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const debounceTimer = useRef(null);

  // Keep the URL in sync with current filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "All") params.set("type", type);
    if (availability !== "All") params.set("availability", availability);

    const newUrl = params.toString() ? `?${params.toString()}` : "/cars";
    navigate(newUrl, { replace: true });
  }, [search, type, availability, navigate]);

  // Search after 500ms of no typing (debounce)
  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSearch(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    clearTimeout(debounceTimer.current);
    setSearch(searchInput);
    setCurrentPage(1);
  };

  // Fetch cars from API whenever search or type changes
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
  }, [search, type]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = type === "All" || car.type === type;
      const matchesAvailability =
        availability === "All" || car.availability === availability;
      return matchesSearch && matchesType && matchesAvailability;
    });
  }, [availability, search, type, cars]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const currentCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="container py-12 md:py-16">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Explore Fleet
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Find your next rental car
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Search by name and filter by type or availability to find the
            perfect ride.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <p className="rounded-md bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent)]">
            {loading ? "Searching..." : `${filteredCars.length} cars found`}
          </p>
        </div>
      </div>

      {/* Filters Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 grid gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-4 md:grid-cols-[1fr_120px_190px_190px]"
      >
        <div className="relative">
          <input
            className={`${controlClass} w-full pr-10`}
            placeholder="Search by car name"
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearch("");
                setCurrentPage(1);
                clearTimeout(debounceTimer.current);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="h-12 rounded-md bg-[var(--accent)] px-4 text-sm font-bold text-white transition hover:bg-[var(--accent-dark)]"
        >
          Search
        </button>
        <select
          className={controlClass}
          value={type}
          onChange={(event) => {
            setType(event.target.value);
            setCurrentPage(1);
          }}
        >
          {carTypes.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Types" : option}
            </option>
          ))}
        </select>
        <select
          className={controlClass}
          value={availability}
          onChange={(event) => {
            setAvailability(event.target.value);
            setCurrentPage(1);
          }}
        >
          {availabilityOptions.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "Any Status" : option}
            </option>
          ))}
        </select>
      </form>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-md bg-[var(--line)]"
            />
          ))}
        </div>
      )}

      {/* Cars Grid */}
      {!loading && currentCars.length > 0 && (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentCars.map((car) => (
              <article
                key={car._id || car.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <img
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                    src={car.image}
                    alt={car.name}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-lg">{car.name}</h2>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">
                        {car.type} · {car.seats} seats
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                        car.availability === "Available"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {car.availability}
                    </span>
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[var(--muted)]">
                        Pickup
                      </span>
                      <span className="font-bold">{car.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[var(--muted)]">
                        Rent
                      </span>
                      <span className="text-lg font-black text-[var(--accent)]">
                        ${car.price}/day
                      </span>
                    </div>
                    <Link
                      className="block rounded-md bg-[var(--accent)] py-2.5 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95"
                      to={`/cars/${car._id || car.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--line)] bg-white font-bold transition hover:bg-[var(--line)] disabled:opacity-50 disabled:hover:bg-white"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border font-bold transition ${
                    currentPage === i + 1
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-[var(--line)] bg-white hover:bg-[var(--line)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--line)] bg-white font-bold transition hover:bg-[var(--line)] disabled:opacity-50 disabled:hover:bg-white"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && currentCars.length === 0 && (
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-white p-10 text-center text-[var(--muted)]">
          No cars match your search.
        </div>
      )}
    </section>
  );
}
