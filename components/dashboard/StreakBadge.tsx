import { Streak } from "@/lib/types";

export function StreakBadge({ streak }: { streak: Streak }) {
  return (
    <div className="flex items-center gap-4 rounded border p-4">
      <div>
        <p className="text-2xl font-bold">{streak.current_streak_days}</p>
        <p className="text-xs text-gray-500">day streak</p>
      </div>
      <div className="text-sm text-gray-500">Best: {streak.longest_streak_days} days</div>
    </div>
  );
}
