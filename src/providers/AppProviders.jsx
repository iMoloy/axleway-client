"use client";

import { HeroUIProvider } from "@heroui/react";
import { AuthProvider } from "./AuthProvider";

export function AppProviders({ children }) {
  return (
    <HeroUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </HeroUIProvider>
  );
}
