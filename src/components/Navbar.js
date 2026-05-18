"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { useAuth } from "@/providers/AuthProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore Cars" },
  { href: "/add-car", label: "Add Car" },
  { href: "/my-bookings", label: "My Bookings" }
];

export function Navbar() {
  const { user, logOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/90 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-4">
        <Link className="text-xl font-black text-[var(--accent)]" href="/">
          AxleWay
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden max-w-36 truncate text-sm font-semibold sm:block">
                {user.displayName || user.email}
              </span>
              <Button color="danger" size="sm" variant="flat" onPress={logOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} color="primary" href="/login" size="sm">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
