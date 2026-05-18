import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-[var(--muted)]">
          Firebase login form will be added in the auth commit.
        </p>
        <Link className="mt-6 inline-block font-bold text-[var(--accent)]" href="/register">
          Create a new account
        </Link>
      </div>
    </section>
  );
}

