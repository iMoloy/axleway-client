"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { syncAuthCookie } from "@/lib/authApi";
import { auth, googleProvider } from "@/lib/firebase";

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!auth) {
      toast.error("Firebase configuration is missing.");
      return;
    }

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const cookieReady = await syncAuthCookie(result.user);

      if (!cookieReady) {
        toast.warning("Logged in, but server token is not ready yet.");
      } else {
        toast.success("Login successful");
      }

      router.push("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) {
      toast.error("Firebase configuration is missing.");
      return;
    }

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const cookieReady = await syncAuthCookie(result.user);

      if (!cookieReady) {
        toast.warning("Logged in, but server token is not ready yet.");
      } else {
        toast.success("Google login successful");
      }

      router.push("/");
    } catch (error) {
      toast.error(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container grid min-h-[72vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold">Login to AxleWay</h1>
        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          <label className={labelClass}>
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
          <label className={labelClass}>
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
          <Button className="w-full font-bold" color="primary" isLoading={loading} type="submit">
            Login
          </Button>
        </form>
        <Button className="mt-3 w-full font-bold" variant="bordered" onPress={handleGoogleLogin}>
          Continue with Google
        </Button>
        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          New to AxleWay?{" "}
          <Link className="font-bold text-[var(--accent)]" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
