"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { syncAuthCookie } from "@/lib/authApi";
import { auth, googleProvider } from "@/lib/firebase";

const inputClass =
  "mt-1.5 h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel-soft)] px-4 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:bg-white focus:ring-2 focus:ring-[var(--accent)]/15";

function getPasswordError(password) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must have one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must have one lowercase letter.";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!auth) return toast.error("Firebase configuration is missing.");

    const form = e.currentTarget;
    const password = form.password.value;
    const error = getPasswordError(password);
    if (error) return setPasswordError(error);

    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        form.email.value,
        password,
      );
      await updateProfile(result.user, {
        displayName: form.name.value,
        photoURL: form.photoURL.value,
      });
      toast.success("Registration successful. Please login now.");
      router.push("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
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
      router.push("/");
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black">Create your account</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Join AxleWay and start renting today
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="w-full rounded-md bg-[var(--accent)] py-3 text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-xs text-[var(--muted)]">
            or register with email
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <label className="block text-sm font-bold">
            Full Name
            <input
              required
              autoComplete="name"
              className={inputClass}
              name="name"
              placeholder="Your full name"
              type="text"
            />
          </label>
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
            Photo URL{" "}
            <span className="font-normal text-[var(--muted)]">(optional)</span>
            <input
              autoComplete="url"
              className={inputClass}
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </label>
          <label className="block text-sm font-bold">
            Password
            <input
              required
              autoComplete="new-password"
              name="password"
              placeholder="Min 6 chars, uppercase & lowercase"
              type="password"
              className={`${inputClass} ${passwordTouched && passwordError ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              onBlur={() => setPasswordTouched(true)}
              onChange={(e) => {
                setPasswordTouched(true);
                setPasswordError(getPasswordError(e.target.value));
              }}
            />
            {passwordTouched && passwordError && (
              <span className="mt-1 block text-xs font-semibold text-red-500">
                {passwordError}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[var(--accent)] py-3 text-sm font-bold !text-white transition hover:bg-[var(--accent-dark)] disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link className="font-bold text-[var(--accent)]" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
