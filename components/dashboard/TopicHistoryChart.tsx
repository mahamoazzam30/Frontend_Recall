import { HistoryPoint } from "@/lib/types";

// Simple line-chart approximation without a charting library: group by
// concept and render accuracy as a sparkline of bars, per the plan's
// "simple line chart" scope.
export function TopicHistoryChart({ points }: { points: HistoryPoint[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-gray-500">No quiz history yet.</p>;
  }

  const byConcept = new Map<string, HistoryPoint[]>();
  for (const point of points) {
    const list = byConcept.get(point.concept_name) ?? [];
    list.push(point);
    byConcept.set(point.concept_name, list);
  }

  return (
    <div className="flex flex-col gap-4">
      {Array.from(byConcept.entries()).map(([conceptName, series]) => (
        <div key={conceptName}>
          <p className="mb-1 text-sm font-medium">{conceptName}</p>
          <div className="flex h-16 items-end gap-1">
            {series.map((point, i) => (
              <div
                key={i}
                title={`${Math.round(point.accuracy * 100)}% on ${new Date(point.date).toLocaleDateString()}`}
                className="w-2 flex-1 rounded-t bg-black"
                style={{ height: `${Math.max(4, point.accuracy * 100)}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
