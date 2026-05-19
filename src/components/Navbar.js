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
  { href: "/add-car", label: "Add Car", special: true },
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
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/80 backdrop-blur-md">
      <div className="container flex min-h-20 items-center justify-between gap-3">
        {/* Logo */}
        <Link className="flex items-center gap-1 text-2xl font-black tracking-tight" href="/" onClick={closeMenus}>
          <span className="text-[var(--accent)]">Axle</span>
          <span className="text-[var(--action)]">Way</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`relative font-bold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:text-[var(--foreground)] hover:after:w-full ${pathname === item.href ? "text-[var(--foreground)] after:w-full" : "text-[var(--muted)]"}`}
            >
              {item.label}
            </Link>
          ))}
          {user && authNavLinks.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`font-bold transition-colors ${item.special ? "rounded-full bg-[var(--accent)] px-4 py-2 !text-white hover:bg-[var(--accent-dark)]" : "relative text-[var(--muted)] hover:text-[var(--foreground)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"} ${pathname === item.href && !item.special ? "text-[var(--foreground)] after:w-full" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth / Mobile Toggle */}
        <div className="flex items-center gap-3">
          {!user && (
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--panel)] text-lg font-black transition-colors hover:bg-[var(--accent-soft)] md:hidden"
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
                className="flex h-11 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] py-1 pl-1 pr-3 text-left shadow-sm transition hover:border-[var(--accent)] hover:shadow-md"
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-[var(--accent-soft)] text-xs font-black text-[var(--accent-dark)]">
                  {user.photoURL ? (
                    <img className="h-full w-full object-cover" src={user.photoURL} alt={user.displayName || user.email} />
                  ) : (
                    (user.displayName || user.email || "U").slice(0, 1).toUpperCase()
                  )}
                </span>
                <span className="hidden max-w-28 truncate text-sm font-bold text-[var(--foreground)] sm:block">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <span className="text-xs text-[var(--muted)]">▼</span>
              </button>

              {menuOpen ? (
                <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-xl border border-[var(--line)] bg-[var(--panel)] p-2 shadow-2xl transition-all">
                  <div className="mb-2 border-b border-[var(--line)] px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-bold text-[var(--foreground)]">{user.displayName || "User"}</p>
                    <p className="truncate text-xs font-medium text-[var(--muted)]">{user.email}</p>
                  </div>
                  
                  {/* Mobile-only nav links inside dropdown */}
                  <div className="md:hidden">
                    {navLinks.map((item) => (
                      <Link
                        key={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {authNavLinks.map((item) => (
                      <Link
                        key={item.href}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="my-1 border-t border-[var(--line)]"></div>
                  </div>

                  {dropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <button
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
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
                <Button as={Link} color="primary" href="/register" className="font-bold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-dark)] !text-white" size="sm" variant="solid" radius="sm">
                  Register
                </Button>
              ) : (
                <Button as={Link} color="primary" href="/login" className="font-bold rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-dark)] !text-white" size="sm" variant="solid" radius="sm">
                  Login
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!user && mobileOpen ? (
        <div className="border-t border-[var(--line)] bg-[var(--panel)] shadow-inner md:hidden">
          <nav className="container grid gap-2 py-5 text-sm font-bold">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                className="rounded-lg px-4 py-3 text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
                href={item.href}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 border-t border-[var(--line)] pt-4">
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

