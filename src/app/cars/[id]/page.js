"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";
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
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "A smooth city sedan with calm handling, clean cabin space, and easy airport pickup."
  },
  {
    id: "metro-suv",
    name: "Metro SUV",
    type: "SUV",
    price: 72,
    seats: 7,
    location: "Gulshan",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
    description: "A roomy SUV for family routes, weekend plans, and comfortable group travel."
  },
  {
    id: "city-hatch",
    name: "City Hatch",
    type: "Hatchback",
    price: 36,
    seats: 4,
    location: "Dhanmondi",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80",
    description: "A compact hatchback made for short city drives and easy parking."
  },
  {
    id: "orbit-electric",
    name: "Orbit Electric",
    type: "Electric",
    price: 62,
    seats: 5,
    location: "Banani",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    description: "A quiet electric ride with instant torque and low running cost for modern routes."
  },
  {
    id: "summit-luxury",
    name: "Summit Luxury",
    type: "Luxury",
    price: 110,
    seats: 4,
    location: "Uttara",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=1200&q=80",
    description: "A premium rental option with refined comfort for business and special events."
  },
  {
    id: "family-microbus",
    name: "Family Microbus",
    type: "Microbus",
    price: 88,
    seats: 10,
    location: "Mirpur",
    availability: "Unavailable",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "A group-friendly microbus for tours, team travel, and family trips."
  }
];

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const textareaClass =
  "mt-2 min-h-28 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

export default function CarDetailsPage() {
  const params = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadCar() {
      try {
        setLoading(true);
        const data = await apiFetch(`/cars/${params.id}`);
        if (!ignore) {
          setCar(data);
          setUsingDemoData(false);
        }
      } catch {
        if (!ignore) {
          setCar(demoCars.find((item) => item.id === params.id) || null);
          setUsingDemoData(true);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    if (params.id) {
      loadCar();
    }

    return () => {
      ignore = true;
    };
  }, [params.id]);

  const handleBooking = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (usingDemoData) {
      toast.info("Connect the server API to book this listing.");
      return;
    }

    const booking = {
      carId: car._id || car.id,
      carName: car.name,
      carType: car.type,
      totalPrice: Number(car.price),
      driverNeeded: formData.get("driverNeeded"),
      note: formData.get("note")
    };

    try {
      setBookingLoading(true);
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify(booking)
      });
      toast.success("Booking created successfully");
      setBookingOpen(false);
    } catch (error) {
      toast.error(error.message || "Could not create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="container flex min-h-[60vh] items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--action)]" />
      </section>
    );
  }

  if (!car) {
    return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-bold">Car not found</h1>
        <p className="mt-3 text-[var(--muted)]">This listing may be unavailable or still loading from the database.</p>
        <Link className="primary-button mt-6" href="/cars">
          Back to Cars
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-12 md:py-16">
      <Link className="text-sm font-bold text-[var(--accent-dark)]" href="/cars">
        Back to Explore Cars
      </Link>

      {usingDemoData ? (
        <p className="mt-5 inline-flex rounded-lg bg-[var(--highlight)] px-4 py-2 text-sm font-bold text-[var(--ink)]">
          Showing demo listing while API data is unavailable
        </p>
      ) : null}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] p-3 shadow-sm">
          <img className="h-[320px] w-full rounded-md object-cover md:h-[520px]" src={car.image} alt={car.name} />
        </div>

        <aside className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-dark)]">
            {car.availability}
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">{car.name}</h1>
          <p className="mt-3 leading-7 text-[var(--muted)]">{car.description}</p>

          <div className="mt-6 grid gap-3 text-sm">
            <DetailRow label="Type" value={car.type} />
            <DetailRow label="Seats" value={`${car.seats} seats`} />
            <DetailRow label="Pickup" value={car.location} />
            <DetailRow label="Daily Rent" value={`$${car.price}/day`} />
          </div>

          <Button
            className="mt-7 w-full font-bold"
            color="primary"
            isDisabled={car.availability !== "Available"}
            onPress={() => setBookingOpen(true)}
          >
            Book Now
          </Button>
        </aside>
      </div>

      {bookingOpen ? (
        <PrivateRoute>
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <form className="w-full max-w-lg rounded-lg bg-[var(--panel)] p-6 shadow-2xl" onSubmit={handleBooking}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Booking request
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{car.name}</h2>
                </div>
                <button
                  className="rounded-md px-3 py-1 text-xl font-bold hover:bg-[var(--accent-soft)]"
                  type="button"
                  onClick={() => setBookingOpen(false)}
                >
                  x
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <label className={labelClass}>
                  Driver Needed
                  <select required className={inputClass} defaultValue="No" name="driverNeeded">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Special Note
                  <textarea
                    className={textareaClass}
                    name="note"
                    placeholder="Pickup time, trip plan, luggage, or driver preference."
                  />
                </label>
                <div className="rounded-lg bg-[var(--accent-soft)] p-4 text-sm font-bold text-[var(--accent-dark)]">
                  Estimated total: ${car.price} for one day
                </div>
                <Button className="w-full font-bold" color="primary" isLoading={bookingLoading} type="submit">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </PrivateRoute>
      ) : null}
    </section>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--panel-soft)] px-4 py-3">
      <span className="font-semibold text-[var(--muted)]">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
