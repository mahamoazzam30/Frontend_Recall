export function StatTile({
  label,
  value,
  unit,
  statusDot,
  icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  statusDot?: "success" | "warning" | "error" | "info" | "muted";
  icon?: React.ReactNode;
}) {
  const dotClass = {
    success: "bg-status-success",
    warning: "bg-status-warning",
    error: "bg-status-error",
    info: "bg-status-info",
    muted: "bg-ink-muted",
  }[statusDot ?? "muted"];

  return (
    <div className="card-elevated p-6 hover-lift">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {statusDot && <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />}
          <p className="text-sm font-medium text-ink-secondary">{label}</p>
        </div>
        {icon && <div className="text-ink-muted">{icon}</div>}
      </div>
      <p className="text-4xl font-bold text-ink-primary">
        {value} {unit && <span className="text-lg font-normal text-ink-muted ml-1">{unit}</span>}
      </p>
    </div>
  );
}
