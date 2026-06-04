import { Suspense } from "react";
import Cars from "@/views/Cars";

export const metadata = {
  title: "Explore Cars – AxleWay",
  description:
    "Browse and filter our fleet of verified rental cars. Search by name, type, and availability.",
};

export default function CarsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--action)]" />
        </div>
      }
    >
      <Cars />
    </Suspense>
  );
}
