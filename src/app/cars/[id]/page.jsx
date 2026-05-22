"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";
import { apiFetch } from "@/lib/api";

const inputClass =
  "mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";
const textareaClass =
  "mt-2 min-h-28 w-full rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

// Returns today as YYYY-MM-DD for the date input min attribute
function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

// How many days between two YYYY-MM-DD strings (same day = 1 day)
function calcDays(start, end) {
  if (!start || !end) return 0;
  if (start === end) return 1;
  const diffMs = new Date(end) - new Date(start);
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

    const days = calcDays(startDate, endDate);

    if (!startDate || !endDate) {
      return toast.error("Please select a start and end date.");
    }
    if (days < 1) {
      return toast.error("End date must be after the start date.");
    }

    const booking = {
      carId: car._id || car.id,
      carName: car.name,
      carType: car.type,
      startDate,
      endDate,
      rentalDays: days,
      totalPrice: days * Number(car.price),
      driverNeeded: formData.get("driverNeeded"),
      note: formData.get("note"),
    };

    try {
      setBookingLoading(true);
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify(booking),
      });
      toast.success("Booking confirmed! Redirecting to your bookings…");
      setBookingOpen(false);
      setTimeout(() => router.push("/my-bookings"), 1500);
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
        <p className="mt-3 text-[var(--muted)]">
          This listing may be unavailable or still loading from the database.
        </p>
        <Link className="primary-button mt-6" href="/cars">
          Back to Cars
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-12 md:py-16">
      <Link
        className="text-sm font-bold text-[var(--accent)] hover:underline"
        href="/cars"
      >
        ← Back to Explore Cars
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white p-2 shadow-sm">
          <Image
            width={1000}
            height={600}
            className="h-[320px] w-full rounded-md object-cover md:h-[520px]"
            src={car.image}
            alt={car.name}
            priority
          />
        </div>

        <aside className="rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                car.availability === "Available"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {car.availability}
            </span>
            <h1 className="mt-4 text-3xl font-black">{car.name}</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {car.description}
            </p>

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
            className="mt-8 w-full rounded-md bg-[var(--accent)] py-3 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-50 disabled:hover:bg-[var(--accent)]"
          >
            Book Now
          </button>
        </aside>
      </div>

      {bookingOpen ? (
        <PrivateRoute>
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
            <form
              className="w-full max-w-lg rounded-lg border border-[var(--line)] bg-white p-6 shadow-2xl"
              onSubmit={handleBooking}
            >
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
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <label className={labelClass}>
                    Start Date
                    <input
                      required
                      type="date"
                      className={inputClass}
                      min={getTodayString()}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        // Reset end date only if it's before the new start date
                        if (endDate && e.target.value > endDate) {
                          setEndDate("");
                        }
                      }}
                    />
                  </label>
                  <label className={labelClass}>
                    End Date
                    <input
                      required
                      type="date"
                      className={inputClass}
                      min={startDate || getTodayString()}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </label>
                </div>

                {/* Driver Needed */}
                <label className={labelClass}>
                  Driver Needed
                  <select
                    required
                    className={inputClass}
                    defaultValue="No"
                    name="driverNeeded"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>

                {/* Note */}
                <label className={labelClass}>
                  Special Note
                  <textarea
                    className={textareaClass}
                    name="note"
                    placeholder="Pickup time, trip plan, luggage, or driver preference."
                  />
                </label>

                {/* Price Summary */}
                <div className="rounded-md bg-[var(--accent-soft)] p-4 text-sm text-[var(--accent)]">
                  {calcDays(startDate, endDate) > 0 ? (
                    <div className="flex items-center justify-between">
                      <span>
                        {calcDays(startDate, endDate)} day
                        {calcDays(startDate, endDate) > 1 ? "s" : ""} × $
                        {car.price}/day
                      </span>
                      <span className="text-base font-black">
                        ${calcDays(startDate, endDate) * car.price}
                      </span>
                    </div>
                  ) : (
                    <p className="font-bold">Select dates to see total price</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full rounded-md bg-[var(--accent)] py-3 text-center text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-60"
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
