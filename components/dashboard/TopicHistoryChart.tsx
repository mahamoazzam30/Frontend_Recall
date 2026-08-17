import { HistoryPoint } from "@/lib/types";

// Small multiples: one sparkline card per concept, sequential blue (one hue,
// magnitude-only), the most recent attempt in the accent step and the rest
// in a lighter step of the same ramp.
export function TopicHistoryChart({ points }: { points: HistoryPoint[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-ink-muted">No quiz history yet.</p>;
  }

  const byConcept = new Map<string, HistoryPoint[]>();
  for (const point of points) {
    const list = byConcept.get(point.concept_name) ?? [];
    list.push(point);
    byConcept.set(point.concept_name, list);
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {Array.from(byConcept.entries()).map(([conceptName, series]) => {
        const latest = series[series.length - 1];
        return (
          <div key={conceptName} className="rounded-xl border border-ink-primary/10 bg-surface-card p-3">
            <div className="mb-2 flex items-baseline justify-between">
              <p className="truncate text-sm font-medium text-ink-primary">{conceptName}</p>
              <p className="text-sm font-semibold text-ink-primary">{Math.round(latest.accuracy * 100)}%</p>
            </div>
            <div className="flex h-14 items-end gap-1 border-b border-baseline">
              {series.map((point, i) => {
                const isLast = i === series.length - 1;
                return (
                  <div
                    key={i}
                    title={`${Math.round(point.accuracy * 100)}% on ${new Date(point.date).toLocaleDateString()}`}
                    className={`w-2 flex-1 rounded-t ${isLast ? "bg-seq-500" : "bg-seq-250"}`}
                    style={{ height: `${Math.max(4, point.accuracy * 100)}%` }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
