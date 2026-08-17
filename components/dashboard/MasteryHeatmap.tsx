import { MasteryEntry } from "@/lib/types";

type Band = { bg: string; text: string; label: string };

function bandForAccuracy(accuracy: number): Band {
  if (accuracy >= 0.8) return { bg: "bg-status-good", text: "text-white", label: "Mastered" };
  if (accuracy >= 0.6) return { bg: "bg-status-warning", text: "text-ink-primary", label: "Solid" };
  if (accuracy >= 0.4) return { bg: "bg-status-serious", text: "text-ink-primary", label: "Shaky" };
  return { bg: "bg-status-critical", text: "text-white", label: "Weak" };
}

export function MasteryHeatmap({ entries }: { entries: MasteryEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-ink-muted">No mastery data yet — complete a quiz session to see progress.</p>;
  }

  const sorted = [...entries].sort((a, b) => a.accuracy_ema - b.accuracy_ema);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {sorted.map((entry) => {
        const band = bandForAccuracy(entry.accuracy_ema);
        return (
          <div key={entry.concept_id} className={`rounded-xl p-3 ${band.bg}`} title={band.label}>
            <p className={`truncate text-sm font-medium ${band.text}`}>{entry.concept_name}</p>
            <p className={`mt-2 text-2xl font-semibold ${band.text}`}>{Math.round(entry.accuracy_ema * 100)}%</p>
            <p className={`text-xs opacity-80 ${band.text}`}>{band.label}</p>
          </div>
        );
      })}
    </div>
  );
}
