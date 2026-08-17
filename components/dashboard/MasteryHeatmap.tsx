import { MasteryEntry } from "@/lib/types";

function colorForAccuracy(accuracy: number): string {
  if (accuracy >= 0.8) return "bg-green-500";
  if (accuracy >= 0.6) return "bg-yellow-400";
  if (accuracy >= 0.4) return "bg-orange-400";
  return "bg-red-400";
}

export function MasteryHeatmap({ entries }: { entries: MasteryEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">No mastery data yet — complete a quiz session to see progress.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {entries.map((entry) => (
        <div key={entry.concept_id} className="rounded border p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="truncate text-sm font-medium">{entry.concept_name}</span>
            <span className={`h-3 w-3 rounded-full ${colorForAccuracy(entry.accuracy_ema)}`} />
          </div>
          <span className="text-xs text-gray-500">{Math.round(entry.accuracy_ema * 100)}% mastery</span>
        </div>
      ))}
    </div>
  );
}
