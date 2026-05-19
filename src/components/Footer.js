import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] pb-8 pt-16 text-white">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black text-[var(--highlight)]">AxleWay</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              A premium car rental platform designed to provide a seamless and reliable travel experience. Find the perfect ride for your next journey, directly from trusted owners.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <Link className="transition hover:text-[var(--action)]" href="/">Home</Link>
              </li>
              <li>
                <Link className="transition hover:text-[var(--action)]" href="/cars">Explore Fleet</Link>
              </li>
              <li>
                <Link className="transition hover:text-[var(--action)]" href="/add-car">List Your Car</Link>
              </li>
              <li>
                <Link className="transition hover:text-[var(--action)]" href="/my-bookings">My Bookings</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Connect</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a className="transition hover:text-[var(--action)]" href="mailto:support@axleway.com">support@axleway.com</a>
              </li>
              <li>
                <a className="transition hover:text-[var(--action)]" href="#">Facebook</a>
              </li>
              <li>
                <a className="transition hover:text-[var(--action)]" href="#">Instagram</a>
              </li>
              <li>
                <a className="transition hover:text-[var(--action)]" href="#">X (Twitter)</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} AxleWay Car Rentals. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
