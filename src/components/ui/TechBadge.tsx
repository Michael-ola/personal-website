export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--border)] bg-[var(--chip)] px-3 py-1.5 text-xs text-[var(--muted-strong)]">
      {children}
    </span>
  );
}
