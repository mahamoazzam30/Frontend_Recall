"use client";

import { DueTodayList } from "@/components/dashboard/DueTodayList";
import { MasteryHeatmap } from "@/components/dashboard/MasteryHeatmap";
import { StreakBadge } from "@/components/dashboard/StreakBadge";
import { TopicHistoryChart } from "@/components/dashboard/TopicHistoryChart";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useDueToday, useHistory, useMastery, useStreak } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const mastery = useMastery();
  const dueToday = useDueToday();
  const streak = useStreak();
  const history = useHistory();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {streak.data && <StreakBadge streak={streak.data} />}

      <section>
        <h2 className="mb-3 font-semibold">Due today</h2>
        {dueToday.isLoading ? <LoadingSpinner /> : <DueTodayList entries={dueToday.data ?? []} />}
      </section>

      <section>
        <h2 className="mb-3 font-semibold">Mastery by concept</h2>
        {mastery.isLoading ? <LoadingSpinner /> : <MasteryHeatmap entries={mastery.data ?? []} />}
      </section>

      <section>
        <h2 className="mb-3 font-semibold">Accuracy over time</h2>
        {history.isLoading ? <LoadingSpinner /> : <TopicHistoryChart points={history.data ?? []} />}
      </section>
    </div>
  );
}
