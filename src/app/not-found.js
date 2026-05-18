import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)]">404</p>
      <h1 className="mt-3 text-4xl font-bold">This route is not ready.</h1>
      <p className="mt-3 max-w-md text-[var(--muted)]">
        The page may be moved, private, or still under development.
      </p>
      <Link className="primary-button mt-6" href="/">
        Back to Home
      </Link>
    </section>
  );
}

