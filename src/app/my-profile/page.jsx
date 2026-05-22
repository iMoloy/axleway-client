"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function MyProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [stats, setStats] = useState({ cars: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") || "";
    const photoURL = formData.get("photoURL") || "";

    try {
      setEditLoading(true);
      await updateUserProfile(name, photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setEditLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();

      if (data.success) {
        const urlInput = document.getElementById("photoURLInput");
        if (urlInput) urlInput.value = data.data.display_url;
        toast.success("Image uploaded from local device!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setEditLoading(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      if (!user?.email) return;

      try {
        setLoading(true);
        const [carsData, bookingsData] = await Promise.all([
          apiFetch(`/cars/owner/${user.email}`),
          apiFetch("/bookings"),
        ]);

        if (!ignore) {
          setStats({
            cars: carsData?.length || 0,
            bookings: bookingsData?.length || 0,
          });
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadStats();
    return () => {
      ignore = true;
    };
  }, [user]);

  if (!user) return null;

  return (
    <PrivateRoute>
      <section className="container py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Account overview
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">My Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm md:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[var(--accent-soft)] text-3xl font-black text-[var(--accent-dark)]">
                {user.photoURL ? (
                  <Image
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                ) : (
                  (user.displayName || user.email || "U")
                    .charAt(0)
                    .toUpperCase()
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold">
                {user.displayName || "User"}
              </h2>
              <p className="text-sm text-[var(--muted)]">{user.email}</p>
            </div>
            <div className="mt-6 border-t border-[var(--line)] pt-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Status
              </p>
              <p className="mt-1 font-bold text-green-600">Active Member</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full rounded-md border border-[var(--line)] py-2 text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--panel-soft)]"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
            <div className="flex flex-col justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
              <h3 className="text-lg font-bold">Total Cars Added</h3>
              {loading ? (
                <div className="mt-2 h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--accent)]" />
              ) : (
                <p className="mt-2 text-5xl font-black text-[var(--accent)]">
                  {stats.cars}
                </p>
              )}
              <Link
                href="/my-added-cars"
                className="mt-4 text-sm font-bold text-[var(--accent)] hover:underline"
              >
                Manage your cars &rarr;
              </Link>
            </div>

            <div className="flex flex-col justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
              <h3 className="text-lg font-bold">Total Bookings</h3>
              {loading ? (
                <div className="mt-2 h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--accent)]" />
              ) : (
                <p className="mt-2 text-5xl font-black text-[var(--action)]">
                  {stats.bookings}
                </p>
              )}
              <Link
                href="/my-bookings"
                className="mt-4 text-sm font-bold text-[var(--action)] hover:underline"
              >
                View booking history &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <form
            className="w-full max-w-sm rounded-lg border border-[var(--line)] bg-[var(--panel)] p-6 shadow-xl"
            onSubmit={handleEditProfile}
          >
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <div className="mt-4 grid gap-4">
              <label className="block text-sm font-bold text-[var(--foreground)]">
                Name
                <input
                  required
                  defaultValue={user.displayName || ""}
                  name="name"
                  className="mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </label>
              <label className="block text-sm font-bold text-[var(--foreground)]">
                Photo URL
                <div className="mt-2 flex gap-2">
                  <input
                    id="photoURLInput"
                    type="url"
                    defaultValue={user.photoURL || ""}
                    name="photoURL"
                    className="h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                  <div className="relative flex w-36 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--line)] bg-[var(--panel-soft)] font-bold text-[var(--muted)] transition hover:bg-[var(--line)]">
                    <span className="text-xs">Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={handleImageUpload}
                      disabled={editLoading}
                    />
                  </div>
                </div>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="font-bold text-[var(--muted)] hover:text-[var(--foreground)]"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={editLoading}
                className="primary-button !rounded-md !min-h-[40px] px-6 !text-sm transition hover:scale-105 active:scale-95 disabled:hover:scale-100"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </PrivateRoute>
  );
}
