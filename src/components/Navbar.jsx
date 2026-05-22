"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { useAuth } from "@/providers/AuthProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Explore Cars" },
];

const authNavLinks = [
  { href: "/add-car", label: "Add Car", special: true },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/my-added-cars", label: "My Added Cars" },
];

const dropdownLinks = [{ href: "/my-profile", label: "My Profile" }];

export function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-md text-white">
      <div className="container flex min-h-20 items-center justify-between gap-3">
        {/* Logo */}
        <Link
          className="flex items-center gap-0.5 text-2xl font-black tracking-tight"
          href="/"
          onClick={closeMenus}
        >
          <span className="text-white">Axle</span>
          <span className="text-[var(--accent)]">Way</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-bold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:text-white hover:after:w-full ${pathname === item.href ? "text-white after:w-full" : "text-white/60"}`}
            >
              {item.label}
            </Link>
          ))}
          {user &&
            authNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold transition-colors ${item.special ? "rounded-md bg-[var(--accent)] px-4 py-2 !text-white hover:bg-[var(--accent-dark)]" : "relative text-white/60 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"} ${pathname === item.href && !item.special ? "text-white after:w-full" : ""}`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        {/* Auth / Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 cursor-pointer"
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {!user && (
            <button
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-lg font-black transition-colors hover:bg-white/10 md:hidden"
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2.5 rounded-md border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 text-left transition hover:border-[var(--accent)] hover:bg-white/10"
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
              >
                {/* Avatar with online dot */}
                <div className="relative">
                  <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-sm bg-[var(--accent-soft)] text-xs font-black text-[var(--accent)]">
                    {user.photoURL ? (
                      <img
                        className="h-full w-full object-cover"
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                      />
                    ) : (
                      (user.displayName || user.email || "U")
                        .slice(0, 1)
                        .toUpperCase()
                    )}
                  </span>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" />
                </div>
                <span className="hidden max-w-28 truncate text-sm font-bold sm:block text-white">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <span className="text-[10px] text-white/40">▼</span>
              </button>

              {menuOpen ? (
                <div className="absolute right-0 mt-2 w-56 rounded-md border border-white/10 bg-black p-1 shadow-2xl">
                  <div className="border-b border-white/10 px-3 py-2 mb-1">
                    <p className="truncate text-sm font-bold text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="truncate text-xs text-white/50">
                      {user.email}
                    </p>
                  </div>

                  <div className="md:hidden">
                    {[...navLinks, ...authNavLinks].map((item) => (
                      <Link
                        key={item.href}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="my-1 border-t border-white/10" />
                  </div>

                  {dropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="mt-1 border-t border-white/10 pt-1">
                    <button
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-950/20"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                as={Link}
                color="primary"
                href="/login"
                className="font-bold rounded-md bg-[var(--accent)] hover:bg-[var(--accent-dark)] !text-white"
                size="sm"
                variant="solid"
                radius="sm"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="font-bold rounded-md border border-[var(--line)] bg-[var(--panel)] text-[var(--foreground)] hover:bg-[var(--panel-soft)]"
                size="sm"
                variant="solid"
                radius="sm"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!user && mobileOpen ? (
        <div className="border-t border-white/10 bg-black/95 shadow-inner md:hidden">
          <nav className="container grid gap-2 py-5 text-sm font-bold">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className="rounded-md px-4 py-3 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                href={item.href}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-white/10 pt-4">
              <Link
                className="primary-button w-full text-center rounded-md"
                href="/login"
                onClick={closeMenus}
              >
                Login
              </Link>
              <Link
                className="block w-full rounded-md border border-[var(--line)] bg-[var(--panel)] py-3 text-center text-sm font-bold text-[var(--foreground)] transition hover:bg-[var(--panel-soft)]"
                href="/register"
                onClick={closeMenus}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
