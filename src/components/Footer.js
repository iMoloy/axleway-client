export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#17211b] py-10 text-white">
      <div className="container grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-black">AxleWay</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            A simple, recruiter-friendly car rental platform built for CAT_05.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Useful Links</h3>
          <p className="mt-3 text-sm text-white/70">Home · Explore Cars · Add Car · My Bookings</p>
        </div>
        <div>
          <h3 className="font-bold">Contact</h3>
          <p className="mt-3 text-sm text-white/70">support@axleway.example</p>
          <p className="mt-2 text-sm text-white/70">Facebook · Instagram · X</p>
        </div>
      </div>
    </footer>
  );
}

