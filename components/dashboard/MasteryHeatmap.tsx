import { MasteryEntry } from "@/lib/types";

type Band = { bg: string; text: string; label: string; border: string };

function bandForAccuracy(accuracy: number): Band {
  if (accuracy >= 0.8) return { bg: "bg-accent-emerald-50", text: "text-accent-emerald-700", label: "Mastered", border: "border-accent-emerald-200" };
  if (accuracy >= 0.6) return { bg: "bg-accent-amber-50", text: "text-accent-amber-700", label: "Solid", border: "border-accent-amber-200" };
  if (accuracy >= 0.4) return { bg: "bg-accent-rose-50", text: "text-accent-rose-700", label: "Shaky", border: "border-accent-rose-200" };
  return { bg: "bg-accent-rose-100", text: "text-accent-rose-800", label: "Weak", border: "border-accent-rose-300" };
}

export function MasteryHeatmap({ entries }: { entries: MasteryEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm text-ink-muted">No mastery data yet — complete a quiz session to see progress.</p>
      </div>
    );
  }

  const sorted = [...entries].sort((a, b) => a.accuracy_ema - b.accuracy_ema);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {sorted.map((entry) => {
        const band = bandForAccuracy(entry.accuracy_ema);
        return (
          <div 
            key={entry.concept_id} 
            className={`card p-4 border-2 ${band.bg} ${band.border} hover-lift transition-all`}
            title={band.label}
          >
            <p className={`truncate text-sm font-semibold ${band.text} mb-2`}>{entry.concept_name}</p>
            <p className={`text-3xl font-bold ${band.text}`}>{Math.round(entry.accuracy_ema * 100)}%</p>
            <p className={`text-xs font-medium mt-1 opacity-70 ${band.text}`}>{band.label}</p>
          </div>
        );
      })}
    </div>
  );
}
