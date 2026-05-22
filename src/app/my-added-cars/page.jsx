"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { PrivateRoute } from "@/components/PrivateRoute";
import { useAuth } from "@/providers/AuthProvider";
import { apiFetch } from "@/lib/api";

const inputClass =
  "mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const textareaClass =
  "mt-2 min-h-28 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

export default function MyAddedCarsPage() {
  const { user, loading: authLoading } = useAuth();
  const [ownerCars, setOwnerCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadOwnerCars() {
      if (!user?.email) return;

      try {
        setLoading(true);
        const data = await apiFetch(`/cars/owner/${user.email}`);
        if (!ignore) {
          setOwnerCars(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!ignore) {
          setOwnerCars([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    if (!authLoading) {
      loadOwnerCars();
    }

    return () => {
      ignore = true;
    };
  }, [authLoading, user?.email]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const carId = editCar?._id || editCar?.id;

    const updates = {
      price: Number(formData.get("price")),
      type: formData.get("type"),
      availability: formData.get("availability"),
      location: formData.get("location"),
      image: formData.get("image"),
      description: formData.get("description"),
    };

    if (!editCar?._id) {
      toast.error("Invalid car selection");
      setEditCar(null);
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/cars/${editCar._id}`, {
        method: "PATCH",
        body: JSON.stringify(updates),
      });
      setOwnerCars((current) =>
        current.map((car) =>
          car._id === editCar._id ? { ...car, ...updates } : car,
        ),
      );
      toast.success("Car updated successfully");
      setEditCar(null);
    } catch (error) {
      toast.error(error.message || "Could not update car");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const carId = deleteCar?._id || deleteCar?.id;

    if (!deleteCar?._id) {
      toast.error("Invalid car selection");
      setDeleteCar(null);
      return;
    }

    try {
      setSaving(true);
      await apiFetch(`/cars/${deleteCar._id}`, {
        method: "DELETE",
      });
      setOwnerCars((current) =>
        current.filter((car) => car._id !== deleteCar._id),
      );
      toast.success("Car deleted successfully");
      setDeleteCar(null);
    } catch (error) {
      toast.error(error.message || "Could not delete car");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Owner garage
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              My Added Cars
            </h1>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Review your listed cars and keep price, availability, location,
              and descriptions up to date.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="rounded-md bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent-dark)]">
              {loading
                ? "Loading listings"
                : `${ownerCars.length} active listings`}
            </p>
          </div>
        </div>

        {ownerCars.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {ownerCars.map((car) => (
              <article
                key={car._id || car.id}
                className="grid overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-sm sm:grid-cols-[210px_1fr]"
              >
                <Image
                  width={300}
                  height={300}
                  className="h-56 w-full object-cover sm:h-full"
                  src={car.image}
                  alt={car.name}
                />
                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">{car.name}</h2>
                      <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                        {car.type} · {car.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-dark)]">
                      {car.availability}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    {car.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <p className="mb-4 text-2xl font-black text-[var(--action)]">
                      ${car.price}/day
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button
                        className="font-bold"
                        variant="bordered"
                        radius="sm"
                        onPress={() => setEditCar(car)}
                      >
                        Update
                      </Button>
                      <Button
                        className="font-bold"
                        color="danger"
                        variant="flat"
                        radius="sm"
                        onPress={() => setDeleteCar(car)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel)] p-8 text-center text-[var(--muted)]">
            You have not added any cars yet.
          </div>
        )}

        {editCar ? (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <form
              className="w-full max-w-2xl rounded-lg bg-[var(--panel)] p-6 shadow-2xl"
              onSubmit={handleUpdate}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                    Update listing
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{editCar.name}</h2>
                </div>
                <button
                  className="rounded-md px-3 py-1 text-xl font-bold hover:bg-[var(--accent-soft)]"
                  type="button"
                  onClick={() => setEditCar(null)}
                >
                  x
                </button>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <label className={labelClass}>
                  Price
                  <input
                    className={inputClass}
                    defaultValue={editCar.price}
                    min="1"
                    name="price"
                    type="number"
                  />
                </label>
                <label className={labelClass}>
                  Type
                  <input
                    className={inputClass}
                    defaultValue={editCar.type}
                    name="type"
                    type="text"
                  />
                </label>
                <label className={labelClass}>
                  Availability
                  <select
                    className={inputClass}
                    defaultValue={editCar.availability}
                    name="availability"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </label>
                <label className={labelClass}>
                  Location
                  <input
                    className={inputClass}
                    defaultValue={editCar.location}
                    name="location"
                    type="text"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Image
                  <input
                    className={inputClass}
                    defaultValue={editCar.image}
                    name="image"
                    type="url"
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Description
                  <textarea
                    className={textareaClass}
                    defaultValue={editCar.description}
                    name="description"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="bordered"
                  radius="sm"
                  onPress={() => setEditCar(null)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={saving}
                  type="submit"
                  radius="sm"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        {deleteCar ? (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-[var(--panel)] p-6 shadow-2xl">
              <h2 className="text-2xl font-bold">Delete {deleteCar.name}?</h2>
              <p className="mt-3 text-[var(--muted)]">
                This action is permanent and cannot be undone. The listing will
                be removed from the platform immediately.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  variant="bordered"
                  radius="sm"
                  onPress={() => setDeleteCar(null)}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={saving}
                  radius="sm"
                  onPress={handleDelete}
                >
                  Delete Car
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PrivateRoute>
  );
}
