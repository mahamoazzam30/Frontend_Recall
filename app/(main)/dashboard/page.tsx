"use client";

import { DueTodayList } from "@/components/dashboard/DueTodayList";
import { MasteryHeatmap } from "@/components/dashboard/MasteryHeatmap";
import { StatTile } from "@/components/dashboard/StatTile";
import { StreakBadge } from "@/components/dashboard/StreakBadge";
import { TopicHistoryChart } from "@/components/dashboard/TopicHistoryChart";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useDueToday, useHistory, useMastery, useStreak } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const mastery = useMastery();
  const dueToday = useDueToday();
  const streak = useStreak();
  const history = useHistory();

  const overallMastery = mastery.data && mastery.data.length > 0
    ? Math.round((100 * mastery.data.reduce((sum, m) => sum + m.accuracy_ema, 0)) / mastery.data.length)
    : 0;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-ink-primary">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {streak.data && <StreakBadge streak={streak.data} />}
        <StatTile
          label="Due today"
          value={dueToday.data?.length ?? 0}
          statusDot={dueToday.data && dueToday.data.length > 0 ? "warning" : "good"}
        />
        <StatTile
          label="Overall mastery"
          value={overallMastery}
          unit="%"
          statusDot={overallMastery >= 80 ? "good" : overallMastery >= 60 ? "warning" : overallMastery >= 40 ? "serious" : "critical"}
        />
      </div>

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Due today</h2>
        {dueToday.isLoading ? <LoadingSpinner /> : <DueTodayList entries={dueToday.data ?? []} />}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Mastery by concept</h2>
        {mastery.isLoading ? <LoadingSpinner /> : <MasteryHeatmap entries={mastery.data ?? []} />}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Accuracy over time</h2>
        {history.isLoading ? <LoadingSpinner /> : <TopicHistoryChart points={history.data ?? []} />}
      </section>
    </div>
  );
}
