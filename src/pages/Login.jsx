import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { syncAuthCookie } from "@/lib/authApi";
import { auth, googleProvider } from "@/lib/firebase";

const inputClass =
  "mt-1.5 h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel-soft)] px-4 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/15";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!auth) return toast.error("Firebase configuration is missing.");

    const form = e.currentTarget;
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        form.email.value,
        form.password.value,
      );
      const ok = await syncAuthCookie(result.user);
      if (!ok) toast.warning("Logged in, but server token is not ready yet.");
      else toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) return toast.error("Firebase configuration is missing.");
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const ok = await syncAuthCookie(result.user);
      if (!ok) toast.warning("Logged in, but server token is not ready yet.");
      else toast.success("Google login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black">Welcome back</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Login to your AxleWay account
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full rounded-md bg-[var(--accent)] py-3 text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-xs text-[var(--muted)]">
            or sign in with email
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block text-sm font-bold">
            Email
            <input
              required
              autoComplete="email"
              className={inputClass}
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </label>
          <label className="block text-sm font-bold">
            Password
            <input
              required
              autoComplete="current-password"
              className={inputClass}
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--accent)] py-3 text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          New to AxleWay?{" "}
          <Link className="font-bold text-[var(--accent)]" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
