export function QuizProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-2 w-full rounded-full bg-hairline">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-seq-500 to-seq-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-ink-muted">
        {current} / {total}
      </span>
    </div>
  );
}
