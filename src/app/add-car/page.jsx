"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";

const carTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Microbus",
];

const inputClass =
  "mt-2 h-12 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const textareaClass =
  "mt-2 min-h-32 w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

function getTrimmedValue(formData, key) {
  return String(formData.get(key) || "").trim();
}

export default function AddCarPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const car = {
      name: getTrimmedValue(formData, "name"),
      price: Number(formData.get("price")),
      type: getTrimmedValue(formData, "type"),
      image: getTrimmedValue(formData, "image"),
      seats: Number(formData.get("seats")),
      location: getTrimmedValue(formData, "location"),
      availability: getTrimmedValue(formData, "availability"),
      description: getTrimmedValue(formData, "description"),
    };

    if (
      !car.name ||
      !car.type ||
      !car.image ||
      !car.location ||
      !car.description
    ) {
      toast.error("Please fill in all car details.");
      return;
    }

    if (!Number.isFinite(car.price) || car.price <= 0) {
      toast.error("Daily rent price must be a positive number.");
      return;
    }

    if (!Number.isFinite(car.seats) || car.seats <= 0) {
      toast.error("Seat capacity must be a positive number.");
      return;
    }

    if (car.description.length < 20) {
      toast.error("Description should be at least 20 characters.");
      return;
    }

    try {
      setLoading(true);
      await apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify(car),
      });
      toast.success("Car added successfully");
      form.reset();
    } catch (error) {
      toast.error(error.message || "Could not add car");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
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
        const urlInput = document.getElementById("carImageInput");
        if (urlInput) urlInput.value = data.data.display_url;
        toast.success("Image uploaded from local device!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <PrivateRoute>
      <section className="container py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Owner dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Add a rental car
          </h1>
          <p className="mt-3 text-[var(--muted)]">
            Share the key details renters need before choosing a vehicle.
          </p>
        </div>

        <form
          className="grid gap-6 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm md:grid-cols-2 md:p-7"
          onSubmit={handleSubmit}
        >
          <label className={labelClass}>
            Car Name
            <input
              required
              className={inputClass}
              name="name"
              placeholder="Toyota Corolla Cross"
              type="text"
            />
          </label>

          <label className={labelClass}>
            Daily Rent Price
            <input
              required
              className={inputClass}
              min="1"
              name="price"
              placeholder="65"
              type="number"
            />
          </label>

          <label className={labelClass}>
            Car Type
            <select required className={inputClass} defaultValue="" name="type">
              <option disabled value="">
                Select a type
              </option>
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Seat Capacity
            <input
              required
              className={inputClass}
              min="1"
              name="seats"
              placeholder="5"
              type="number"
            />
          </label>

          <label className={labelClass}>
            Image URL
            <div className="mt-2 flex gap-2">
              <input
                id="carImageInput"
                required
                className={inputClass.replace("mt-2 ", "")}
                name="image"
                placeholder="https://example.com/car.jpg"
                type="url"
              />
              <div className="relative flex w-36 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--line)] bg-[var(--panel-soft)] font-bold text-[var(--muted)] transition hover:bg-[var(--line)]">
                <span className="text-xs">Upload File</span>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </div>
            </div>
          </label>

          <label className={labelClass}>
            Pickup Location
            <input
              required
              className={inputClass}
              name="location"
              placeholder="Gulshan, Dhaka"
              type="text"
            />
          </label>

          <label className={labelClass}>
            Availability Status
            <select
              required
              className={inputClass}
              defaultValue="Available"
              name="availability"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </label>

          <label className={`${labelClass} md:col-span-2`}>
            Description
            <textarea
              required
              className={textareaClass}
              name="description"
              placeholder="Mention fuel type, comfort, pickup notes, and renter-friendly details."
            />
          </label>

          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:justify-end">
            <Button
              className="font-bold transition hover:scale-105 active:scale-95"
              type="reset"
              variant="bordered"
              radius="sm"
            >
              Clear Form
            </Button>
            <Button
              className="font-bold bg-[var(--accent)] hover:bg-[var(--accent-dark)] !text-white transition hover:scale-105 active:scale-95"
              isLoading={loading}
              type="submit"
              radius="sm"
            >
              Add Car
            </Button>
          </div>
        </form>
      </section>
    </PrivateRoute>
  );
}
