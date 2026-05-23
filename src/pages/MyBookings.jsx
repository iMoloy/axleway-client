import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";
import { apiFetch } from "@/lib/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadBookings() {
      try {
        setLoading(true);
        const data = await apiFetch("/bookings");
        if (!ignore) {
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!ignore) {
          setBookings([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCancel = async () => {
    if (!cancelBooking?._id) {
      toast.error("Invalid booking selection");
      setCancelBooking(null);
      return;
    }

    try {
      setCanceling(true);
      await apiFetch(`/bookings/${cancelBooking._id}`, {
        method: "DELETE",
      });
      setBookings((current) =>
        current.filter((booking) => booking._id !== cancelBooking._id),
      );
      toast.success("Booking canceled successfully");
      setCancelBooking(null);
    } catch (error) {
      toast.error(error.message || "Could not cancel booking");
    } finally {
      setCanceling(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Rental history
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">My Bookings</h1>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Track booking dates, pricing, driver requests, and car details
              from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="rounded-md bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent-dark)]">
              {loading ? "Loading bookings" : `${bookings.length} bookings`}
            </p>
          </div>
        </div>

        {bookings.length ? (
          <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm">
            <div className="hidden grid-cols-[1.4fr_0.8fr_1.1fr_0.7fr_0.8fr] gap-4 border-b border-[var(--line)] bg-[var(--panel-soft)] px-5 py-4 text-sm font-black md:grid">
              <span>Car</span>
              <span>Total Price</span>
              <span>Rental Period</span>
              <span>Driver</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-[var(--line)]">
              {bookings.map((booking) => (
                <article
                  key={booking._id || booking.id}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[1.4fr_0.8fr_1.1fr_0.7fr_0.8fr] md:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold">{booking.carName}</h2>
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-dark)]">
                        {booking.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                      {booking.carType}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {booking.note}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                      Total Price
                    </p>
                    <p className="text-xl font-black text-[var(--action)]">
                      ${booking.totalPrice}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                      Rental Period
                    </p>
                    {booking.startDate && booking.endDate ? (
                      <div>
                        <p className="font-bold text-sm">
                          {formatDate(booking.startDate)} →{" "}
                          {formatDate(booking.endDate)}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--muted)]">
                          {booking.rentalDays} day
                          {booking.rentalDays > 1 ? "s" : ""}
                        </p>
                      </div>
                    ) : (
                      <p className="font-bold text-sm text-[var(--muted)]">
                        {formatDate(booking.bookingDate)}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                      Driver
                    </p>
                    <p className="font-bold">{booking.driverNeeded}</p>
                  </div>

                  <div className="flex gap-2 md:justify-end">
                    <Button
                      as={Link}
                      href={`/cars/${booking.carId}`}
                      size="sm"
                      variant="bordered"
                      radius="sm"
                    >
                      Details
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      variant="flat"
                      radius="sm"
                      onPress={() => setCancelBooking(booking)}
                    >
                      Cancel
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel)] p-8 text-center text-[var(--muted)]">
            You do not have any bookings yet.
          </div>
        )}

        {cancelBooking ? (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-[var(--panel)] p-6 shadow-2xl">
              <h2 className="text-2xl font-bold">
                Cancel {cancelBooking.carName}?
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                This will remove the booking from your rental history.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  variant="bordered"
                  radius="sm"
                  onPress={() => setCancelBooking(null)}
                >
                  Keep Booking
                </Button>
                <Button
                  color="danger"
                  isLoading={canceling}
                  radius="sm"
                  onPress={handleCancel}
                >
                  Cancel Booking
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PrivateRoute>
  );
}

function formatDate(value) {
  if (!value) return "Not set";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
