import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] pb-12 pt-16 text-white">
      <div className="container">
        {/* Top Call-To-Action (CTA) Row */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-black md:text-3xl">
              Ready to hit the road?
            </h2>
            <p className="mt-2 text-xs text-white/60">
              Find and book your ideal car in just a few clicks.
            </p>
          </div>
          <Link
            className="inline-block rounded-md bg-[var(--accent)] px-6 py-3 text-center text-xs font-bold !text-white transition hover:bg-[var(--accent-dark)] hover:scale-105 active:scale-95"
            href="/cars"
          >
            Explore Fleet →
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-black tracking-tight text-white">
              Axle<span className="text-[var(--accent)]">Way</span>
            </h3>
            <p className="mt-4 text-xs leading-6 text-white/50">
              AxleWay is a premium peer-to-peer car sharing marketplace. We
              connect car owners with trusted renters directly.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Useful Links
            </h4>
            <ul className="mt-4 space-y-3 text-xs text-white/70">
              <li>
                <Link
                  className="group inline-flex items-center transition-all duration-200 hover:text-white"
                  href="/"
                >
                  Home
                  <span className="ml-1.5 text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="group inline-flex items-center transition-all duration-200 hover:text-white"
                  href="/cars"
                >
                  Explore Fleet
                  <span className="ml-1.5 text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="group inline-flex items-center transition-all duration-200 hover:text-white"
                  href="/add-car"
                >
                  List Your Car
                  <span className="ml-1.5 text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="group inline-flex items-center transition-all duration-200 hover:text-white"
                  href="/my-bookings"
                >
                  My Bookings
                  <span className="ml-1.5 text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Contact Info
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-white/70">
              <li>
                <span className="block font-semibold text-white/50">
                  Support Email
                </span>
                <a
                  className="transition hover:text-white"
                  href="mailto:support@axleway.com"
                >
                  support@axleway.com
                </a>
              </li>
              <li>
                <span className="block font-semibold text-white/50">
                  Hotline
                </span>
                <span className="text-white">+880 1712-345678</span>
              </li>
              <li>
                <span className="block font-semibold text-white/50">
                  Location
                </span>
                <span className="text-white">Gulshan, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links with Custom Icons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Connect
            </h4>
            <p className="mt-4 text-xs text-white/60">
              Follow us on our channels to stay updated.
            </p>
            <div className="mt-4 flex gap-3">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/80 transition hover:bg-[var(--accent)] hover:text-white hover:scale-110 active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/80 transition hover:bg-[var(--accent)] hover:text-white hover:scale-110 active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/80 transition hover:bg-[var(--accent)] hover:text-white hover:scale-110 active:scale-95"
              >
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[11px] text-white/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} AxleWay Car Rentals. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
