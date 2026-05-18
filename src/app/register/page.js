"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { syncAuthCookie } from "@/lib/authApi";
import { auth, googleProvider } from "@/lib/firebase";

function getPasswordError(password) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must have one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must have one lowercase letter.";
  return "";
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!auth) {
      toast.error("Firebase configuration is missing.");
      return;
    }

    const form = event.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const error = getPasswordError(password);

    if (error) {
      setPasswordError(error);
      return;
    }

    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name, photoURL });
      toast.success("Registration successful. Please login now.");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
          Start driving
        </p>
        <h1 className="mt-2 text-3xl font-bold">Create your account</h1>
        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <Input isRequired label="Name" name="name" placeholder="Your name" variant="bordered" />
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
            label="Photo URL"
            name="photoURL"
            placeholder="https://example.com/photo.jpg"
            type="url"
            variant="bordered"
          />
          <Input
            isInvalid={Boolean(passwordError)}
            isRequired
            errorMessage={passwordError}
            label="Password"
            name="password"
            placeholder="Use uppercase, lowercase, 6+ chars"
            type="password"
            variant="bordered"
            onValueChange={(value) => setPasswordError(getPasswordError(value))}
          />
          <Button className="w-full font-bold" color="primary" isLoading={loading} type="submit">
            Register
          </Button>
        </form>
        <Button className="mt-3 w-full font-bold" variant="bordered" onPress={handleGoogleLogin}>
          Continue with Google
        </Button>
        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link className="font-bold text-[var(--accent)]" href="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
