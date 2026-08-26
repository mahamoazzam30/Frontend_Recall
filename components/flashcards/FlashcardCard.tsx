"use client";

import { Flashcard, RecallRating } from "@/lib/types";

const RECALL_OPTIONS: { value: RecallRating; label: string; className: string }[] = [
  {
    value: "forgot",
    label: "Forgot",
    className: "border-status-critical/30 bg-status-critical/10 text-status-critical hover:bg-status-critical/20",
  },
  {
    value: "struggled",
    label: "Struggled",
    className: "border-status-warning/40 bg-status-warning/10 text-amber-700 hover:bg-status-warning/20",
  },
  {
    value: "knew_it",
    label: "Knew it",
    className: "border-status-good/30 bg-status-good/10 text-status-good hover:bg-status-good/20",
  },
];

export function FlashcardCard({
  card,
  revealed,
  onReveal,
  onRate,
  disabled,
}: {
  card: Flashcard;
  revealed: boolean;
  onReveal: () => void;
  onRate: (recall: RecallRating) => void;
  disabled: boolean;
}) {
  return (
    <div className="card flex min-h-[240px] flex-col justify-between gap-5 p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          {revealed ? "Answer" : "Question"}
        </span>
        <p className="text-lg font-medium text-ink-primary">{revealed ? card.answer_key : card.prompt}</p>
      </div>

      {!revealed && (
        <button onClick={onReveal} className="btn-secondary self-center">
          Show answer
        </button>
      )}

      {revealed && (
        <div className="flex flex-wrap justify-center gap-2">
          {RECALL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onRate(opt.value)}
              disabled={disabled}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${opt.className}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
