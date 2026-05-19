"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { useAuth } from "@/providers/AuthProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore Cars" }
];

const authNavLinks = [
  { href: "/add-car", label: "Add Car" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/my-added-cars", label: "My Added Cars" }
];

const dropdownLinks = [
  { href: "/my-profile", label: "My Profile" }
];

export function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    setMobileOpen(false);
    await logOut();
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/90 backdrop-blur">
      <div className="container flex min-h-16 items-center justify-between gap-3">
        <Link className="text-xl font-black text-[var(--accent)]" href="/" onClick={closeMenus}>
          AxleWay
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--accent)] transition">
              {item.label}
            </Link>
          ))}
          {user && authNavLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--accent)] transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {!user && (
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--panel)] text-lg font-black md:hidden"
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? "x" : "="}
            </button>
          )}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex h-10 items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2 text-left transition hover:border-[var(--accent)]"
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-[var(--accent-soft)] text-xs font-black text-[var(--accent-dark)]">
                  {user.photoURL ? (
                    <img className="h-full w-full object-cover" src={user.photoURL} alt={user.displayName || user.email} />
                  ) : (
                    (user.displayName || user.email || "U").slice(0, 1).toUpperCase()
                  )}
                </span>
                <span className="hidden max-w-32 truncate text-sm font-bold sm:block">
                  {user.displayName || user.email}
                </span>
              </button>

              {menuOpen ? (
                <div className="absolute right-0 mt-3 w-56 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-2 shadow-xl">
                  <p className="border-b border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">
                    {user.email}
                  </p>
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)] md:hidden"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {authNavLinks.map((item) => (
                    <Link
                      key={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)] md:hidden"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {dropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)]"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {pathname === "/login" ? (
                <Button as={Link} color="primary" href="/register" size="sm">
                  Register
                </Button>
              ) : (
                <Button as={Link} color="primary" href="/login" size="sm" variant="flat">
                  Login
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {!user && mobileOpen ? (
        <div className="border-t border-[var(--line)] bg-[var(--panel)] md:hidden">
          <nav className="container grid gap-2 py-4 text-sm font-bold">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className="rounded-lg px-3 py-3 hover:bg-[var(--accent-soft)] transition"
                href={item.href}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid gap-2 pt-2">
              {pathname === "/login" ? (
                <Link className="primary-button w-full" href="/register" onClick={closeMenus}>
                  Register
                </Link>
              ) : (
                <Link className="primary-button secondary-button w-full" href="/login" onClick={closeMenus}>
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
