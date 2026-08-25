function Node({
  title,
  detail,
  accent = false,
}: {
  title: string;
  detail?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "min-w-0 rounded-xl border px-3 py-3 text-center shadow-sm",
        accent
          ? "border-[var(--accent-border)] bg-[var(--accent-soft)]"
          : "border-[var(--border)] bg-[var(--surface)]",
      ].join(" ")}
    >
      <p className="text-xs font-semibold text-[var(--text)]">{title}</p>
      {detail && <p className="mt-1 text-[10px] leading-4 text-[var(--muted)]">{detail}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-lg text-[var(--accent)]" aria-hidden="true">
      →
    </div>
  );
}

export function AgricultureArchitecture() {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--diagram-bg)] p-5 sm:p-7">
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
              Early-warning pipeline
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--text)]">
              Harvester stone detection architecture
            </p>
          </div>
          <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[9px] text-[var(--muted)] sm:inline-flex">
            EDGE AI
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          <Node title="Machine signals" detail="Microphone · speed · cut length" />
          <Arrow />
          <Node title="MF4 pipeline" detail="Load · validate · segment" />
          <Arrow />
          <Node title="Live windows" detail="0.5 s windows · engineered features" />
        </div>

        <div className="my-3 flex justify-center text-lg text-[var(--accent)]" aria-hidden="true">
          ↓
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          <Node title="Reference layer" detail="Metal-detector voltage · event labels" />
          <Arrow />
          <Node title="Random Forest" detail="Grouped run-level validation" accent />
          <Arrow />
          <Node title="Early alarm" detail="Detection score · advance time" accent />
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="text-[10px] text-[var(--muted)]">deployment path</span>
          <span className="text-[var(--accent)]">→</span>
          <span className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1.5 font-mono text-[10px] font-medium text-[var(--accent-strong)]">
            C export · ~11.5 KB · 2 MB MCU PASS
          </span>
        </div>
      </div>
    </div>
  );
}
