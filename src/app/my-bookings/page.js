import { PrivateRoute } from "@/components/PrivateRoute";

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <section className="container py-12">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-2 text-[var(--muted)]">
          User booking cards or table will be added after booking APIs are connected.
        </p>
      </section>
    </PrivateRoute>
  );
}
