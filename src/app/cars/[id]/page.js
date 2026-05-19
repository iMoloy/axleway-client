"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";
import { apiFetch } from "@/lib/api";

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";
const textareaClass =
  "mt-2 min-h-28 w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

export default function CarDetailsPage() {
  const params = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadCar() {
      try {
        setLoading(true);
        const data = await apiFetch(`/cars/${params.id}`);
        if (!ignore) {
          setCar(data);
        }
      } catch {
        if (!ignore) {
          setCar(null);
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
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--accent)]" />
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
      <Link className="text-sm font-bold text-[var(--accent)] hover:underline" href="/cars">
        ← Back to Explore Cars
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white p-2 shadow-sm">
          <img className="h-[320px] w-full rounded-lg object-cover md:h-[520px]" src={car.image} alt={car.name} />
        </div>

        <aside className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
              car.availability === "Available"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}>
              {car.availability}
            </span>
            <h1 className="mt-4 text-3xl font-black">{car.name}</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{car.description}</p>

            <div className="mt-6 grid gap-3 text-sm">
              <DetailRow label="Type" value={car.type} />
              <DetailRow label="Seats" value={`${car.seats} seats`} />
              <DetailRow label="Pickup" value={car.location} />
              <DetailRow label="Daily Rent" value={`$${car.price}/day`} />
            </div>
          </div>

          <button
            onClick={() => setBookingOpen(true)}
            disabled={car.availability !== "Available"}
            className="mt-8 w-full rounded-xl bg-[var(--accent)] py-3 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-50 disabled:hover:bg-[var(--accent)]"
          >
            Book Now
          </button>
        </aside>
      </div>

      {bookingOpen ? (
        <PrivateRoute>
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
            <form className="w-full max-w-lg rounded-xl border border-[var(--line)] bg-white p-6 shadow-2xl" onSubmit={handleBooking}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    Booking request
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{car.name}</h2>
                </div>
                <button
                  className="rounded-md px-3 py-1 text-xl font-bold hover:bg-[var(--panel-soft)]"
                  type="button"
                  onClick={() => setBookingOpen(false)}
                >
                  ✕
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
                <div className="rounded-lg bg-[var(--accent-soft)] p-4 text-sm font-bold text-[var(--accent)]">
                  Estimated total: ${car.price} for one day
                </div>
                
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full rounded-xl bg-[var(--accent)] py-3 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-60"
                >
                  {bookingLoading ? "Confirming…" : "Confirm Booking"}
                </button>
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
      <span className="font-bold">{value}</span>
    </div>
  );
}
