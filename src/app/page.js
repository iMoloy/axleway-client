import Link from "next/link";

const demoCars = [
  {
    name: "Aero Sedan",
    type: "Sedan",
    price: 48,
    location: "Dhaka Airport",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Metro SUV",
    type: "SUV",
    price: 72,
    location: "Gulshan",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "City Hatch",
    type: "Hatchback",
    price: 36,
    location: "Dhanmondi",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80"
  }
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

      <section className="border-y border-[var(--line)] bg-[var(--panel)] py-14">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold">Available Cars</h2>
              <p className="mt-2 text-[var(--muted)]">Database data will replace these starter cards.</p>
            </div>
            <Link className="font-bold text-[var(--accent)]" href="/cars">
              View all cars
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {demoCars.map((car) => (
              <article key={car.name} className="flex h-full flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)]">
                <img className="h-48 w-full object-cover" src={car.image} alt={car.name} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-sm text-[var(--muted)]">{car.type} · {car.location}</p>
                    </div>
                    <p className="font-bold text-[var(--accent)]">${car.price}/day</p>
                  </div>
                  <Link className="primary-button mt-5" href="/cars">
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
