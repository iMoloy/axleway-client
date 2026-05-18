"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { syncAuthCookie } from "@/lib/authApi";
import { auth, googleProvider } from "@/lib/firebase";

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
      <div className="w-full max-w-md rounded-lg border border-[var(--line)] bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold">Login to AxleWay</h1>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="you@example.com"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
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
