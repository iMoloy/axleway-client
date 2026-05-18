"use client";

import { PrivateRoute } from "@/components/PrivateRoute";
import { Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";

const carTypes = ["SUV", "Sedan", "Hatchback", "Luxury", "Electric", "Microbus"];

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const textareaClass =
  "mt-2 min-h-32 w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
const labelClass = "block text-sm font-bold text-[var(--foreground)]";

export default function AddCarPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const car = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      type: formData.get("type"),
      image: formData.get("image"),
      seats: Number(formData.get("seats")),
      location: formData.get("location"),
      availability: formData.get("availability"),
      description: formData.get("description")
    };

    try {
      setLoading(true);
      await apiFetch("/cars", {
        method: "POST",
        body: JSON.stringify(car)
      });
      toast.success("Car added successfully");
      form.reset();
    } catch (error) {
      toast.error(error.message || "Could not add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <section className="container py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Owner dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Add a rental car</h1>
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
            <input required className={inputClass} name="name" placeholder="Toyota Corolla Cross" type="text" />
          </label>

          <label className={labelClass}>
            Daily Rent Price
            <input required className={inputClass} min="1" name="price" placeholder="65" type="number" />
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
            <input required className={inputClass} min="1" name="seats" placeholder="5" type="number" />
          </label>

          <label className={labelClass}>
            Image URL
            <input
              required
              className={inputClass}
              name="image"
              placeholder="https://example.com/car.jpg"
              type="url"
            />
          </label>

          <label className={labelClass}>
            Pickup Location
            <input required className={inputClass} name="location" placeholder="Gulshan, Dhaka" type="text" />
          </label>

          <label className={labelClass}>
            Availability Status
            <select required className={inputClass} defaultValue="Available" name="availability">
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
            <Button className="font-bold" type="reset" variant="bordered">
              Clear Form
            </Button>
            <Button className="font-bold" color="primary" isLoading={loading} type="submit">
              Add Car
            </Button>
          </div>
        </form>
      </section>
    </PrivateRoute>
  );
}
