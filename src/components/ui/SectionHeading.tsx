export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-7 max-w-5xl">
      {eyebrow && (
        <div className="mb-4 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
          <p className="font-mono text-base font-semibold uppercase tracking-[0.17em] text-[var(--accent-strong)] sm:text-lg">
            {eyebrow}
          </p>
          <span className="hidden h-px w-20 bg-gradient-to-r from-[var(--accent-border)] to-transparent sm:block" />
        </div>
      )}
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
