import { PrivateRoute } from "@/components/PrivateRoute";

export default function MyAddedCarsPage() {
  return (
    <PrivateRoute>
      <section className="container py-12">
        <h1 className="text-3xl font-bold">My Added Cars</h1>
        <p className="mt-2 text-[var(--muted)]">
          Owner car cards with update and delete actions will be added after car APIs are connected.
        </p>
      </section>
    </PrivateRoute>
  );
}
