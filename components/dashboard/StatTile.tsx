export function StatTile({
  label,
  value,
  unit,
  statusDot,
}: {
  label: string;
  value: string | number;
  unit?: string;
  statusDot?: "good" | "warning" | "serious" | "critical" | "muted";
}) {
  const dotClass = {
    good: "bg-status-good",
    warning: "bg-status-warning",
    serious: "bg-status-serious",
    critical: "bg-status-critical",
    muted: "bg-ink-muted",
  }[statusDot ?? "muted"];

  return (
    <div className="rounded-xl border border-ink-primary/10 bg-surface-card p-4">
      <div className="mb-1 flex items-center gap-2">
        {statusDot && <span className={`h-2 w-2 rounded-full ${dotClass}`} />}
        <p className="text-sm text-ink-secondary">{label}</p>
      </div>
      <p className="text-3xl font-semibold text-ink-primary">
        {value} {unit && <span className="text-base font-normal text-ink-muted">{unit}</span>}
      </p>
    </div>
  );
}
