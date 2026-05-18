import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-white p-6">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="mt-2 text-[var(--muted)]">
          Name, email, photo URL, and password validation will be added in the auth commit.
        </p>
        <Link className="mt-6 inline-block font-bold text-[var(--accent)]" href="/login">
          Already have an account?
        </Link>
      </div>
    </section>
  );
}

