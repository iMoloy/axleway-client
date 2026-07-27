"use client";
import { useEffect, useRef } from "react";

export function LocationMap({ locationName = "Dhaka", coordinates }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const locationCoords = {
    dhaka: [23.8103, 90.4125],
    chittagong: [22.3569, 91.7832],
    sylhet: [24.8949, 91.8687],
    khulna: [22.8456, 89.5403],
    rajshahi: [24.3745, 88.6042],
    "new york": [40.7128, -74.006],
    london: [51.5074, -0.1278],
  };

  const locKey = (locationName || "").toLowerCase().trim();
  const centerCoords =
    coordinates ||
    locationCoords[locKey] ||
    [23.8103, 90.4125];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;
      import("leaflet/dist/leaflet.css");

      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current).setView(centerCoords, 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const markerIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `<div style="background-color: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 12px rgba(16,185,129,0.4); border: 2px solid white;">🚗</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      L.marker(centerCoords, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup Location</b><br/>${locationName}`)
        .openPopup();
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locationName]);

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 bg-[var(--panel-soft)]">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
          📍 Pickup Location & Navigation Map
        </span>
        <span className="text-xs font-bold text-[var(--foreground)]">
          {locationName}
        </span>
      </div>
      <div
        ref={mapContainerRef}
        className="h-64 w-full z-0 bg-[var(--panel)]"
        style={{ minHeight: "256px" }}
      />
    </div>
  );
}
