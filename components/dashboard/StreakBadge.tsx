import { Streak } from "@/lib/types";

export function StreakBadge({ streak }: { streak: Streak }) {
  const active = streak.current_streak_days > 0;

  return (
    <div className="rounded-xl border border-ink-primary/10 bg-surface-card p-4">
      <div className="mb-1 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${active ? "bg-status-good" : "bg-ink-muted"}`} />
        <p className="text-sm text-ink-secondary">Current streak</p>
      </div>
      <p className="text-3xl font-semibold text-ink-primary">
        {streak.current_streak_days} <span className="text-base font-normal text-ink-muted">days</span>
      </p>
      <p className="mt-1 text-xs text-ink-muted">Best: {streak.longest_streak_days} days</p>
    </div>
  );
}
