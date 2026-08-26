"use client";

import { DueTodayList } from "@/components/dashboard/DueTodayList";
import { MasteryHeatmap } from "@/components/dashboard/MasteryHeatmap";
import { StatTile } from "@/components/dashboard/StatTile";
import { StreakBadge } from "@/components/dashboard/StreakBadge";
import { TopicHistoryChart } from "@/components/dashboard/TopicHistoryChart";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useDueToday, useHistory, useMastery, useStreak } from "@/hooks/useDashboard";
import { SECTION_ACCENT } from "@/lib/sectionAccent";

export default function DashboardPage() {
  const mastery = useMastery();
  const dueToday = useDueToday();
  const streak = useStreak();
  const history = useHistory();

  const overallMastery = mastery.data && mastery.data.length > 0
    ? Math.round((100 * mastery.data.reduce((sum, m) => sum + m.accuracy_ema, 0)) / mastery.data.length)
    : 0;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-black text-ink-primary ${SECTION_ACCENT.dashboard}`}>Dashboard</h1>
          <p className="text-ink-secondary mt-2 text-lg">Track your learning progress and stay on top of your studies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {streak.data && <StreakBadge streak={streak.data} />}
        <StatTile
          label="Due today"
          value={dueToday.data?.length ?? 0}
          statusDot={dueToday.data && dueToday.data.length > 0 ? "warning" : "success"}
        />
        <StatTile
          label="Overall mastery"
          value={overallMastery}
          unit="%"
          statusDot={overallMastery >= 80 ? "success" : overallMastery >= 60 ? "warning" : overallMastery >= 40 ? "error" : "error"}
        />
      </div>

      <section className="card-elevated p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink-primary">Due today</h2>
          {dueToday.data && dueToday.data.length > 0 && (
            <span className="badge badge-warning">{dueToday.data.length} items</span>
          )}
        </div>
        {dueToday.isLoading ? <LoadingSpinner /> : <DueTodayList entries={dueToday.data ?? []} />}
      </section>

      <section className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink-primary">Mastery by concept</h2>
          {mastery.data && mastery.data.length > 0 && (
            <span className="badge badge-info">{mastery.data.length} concepts</span>
          )}
        </div>
        {mastery.isLoading ? <LoadingSpinner /> : <MasteryHeatmap entries={mastery.data ?? []} />}
      </section>

      <section className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink-primary">Accuracy over time</h2>
        </div>
        {history.isLoading ? <LoadingSpinner /> : <TopicHistoryChart points={history.data ?? []} />}
      </section>
    </div>
  );
}
