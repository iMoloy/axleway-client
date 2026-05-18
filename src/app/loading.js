export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-[var(--line)] border-t-[var(--accent)] animate-spin" />
    </div>
  );
}

