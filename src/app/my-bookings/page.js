"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";

const bookings = [
  {
    id: "booking-1",
    carId: "metro-suv",
    carName: "Metro SUV",
    carType: "SUV",
    totalPrice: 72,
    bookingDate: "2026-05-18",
    driverNeeded: "No",
    status: "Confirmed",
    note: "Pickup after 10 AM from Gulshan."
  },
  {
    id: "booking-2",
    carId: "summit-luxury",
    carName: "Summit Luxury",
    carType: "Luxury",
    totalPrice: 110,
    bookingDate: "2026-05-20",
    driverNeeded: "Yes",
    status: "Pending",
    note: "Need driver for airport transfer."
  }
];

export default function MyBookingsPage() {
  const [cancelBooking, setCancelBooking] = useState(null);

  const handleCancel = () => {
    toast.info("Cancel booking flow is ready. Booking API connection comes next.");
    setCancelBooking(null);
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
              Track booking dates, pricing, driver requests, and car details from one place.
            </p>
          </div>
          <p className="rounded-lg bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent-dark)]">
            {bookings.length} bookings
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm">
          <div className="hidden grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_0.8fr] gap-4 border-b border-[var(--line)] bg-[var(--panel-soft)] px-5 py-4 text-sm font-black md:grid">
            <span>Car</span>
            <span>Total Price</span>
            <span>Booking Date</span>
            <span>Driver</span>
            <span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="grid gap-4 px-5 py-5 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr_0.8fr] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold">{booking.carName}</h2>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-dark)]">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{booking.carType}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{booking.note}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                    Total Price
                  </p>
                  <p className="text-xl font-black text-[var(--action)]">${booking.totalPrice}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                    Booking Date
                  </p>
                  <p className="font-bold">{booking.bookingDate}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)] md:hidden">
                    Driver
                  </p>
                  <p className="font-bold">{booking.driverNeeded}</p>
                </div>

                <div className="flex gap-2 md:justify-end">
                  <Button as={Link} href={`/cars/${booking.carId}`} size="sm" variant="bordered">
                    Details
                  </Button>
                  <Button color="danger" size="sm" variant="flat" onPress={() => setCancelBooking(booking)}>
                    Cancel
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {cancelBooking ? (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-[var(--panel)] p-6 shadow-2xl">
              <h2 className="text-2xl font-bold">Cancel {cancelBooking.carName}?</h2>
              <p className="mt-3 text-[var(--muted)]">
                This will cancel the booking once the server booking API is connected.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button variant="bordered" onPress={() => setCancelBooking(null)}>
                  Keep Booking
                </Button>
                <Button color="danger" onPress={handleCancel}>
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
