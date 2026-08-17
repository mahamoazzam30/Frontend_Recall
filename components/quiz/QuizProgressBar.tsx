export function QuizProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-black transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500">
        {current} / {total}
      </span>
    </div>
  );
}
