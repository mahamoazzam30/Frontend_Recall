import { ExamPlan } from "@/lib/types";
import { ProgressRing } from "@/components/shared/ProgressRing";

function urgencyClasses(daysLeft: number): { bg: string; text: string; ring: string } {
  if (daysLeft <= 2) return { bg: "bg-status-critical/10 border-status-critical/30", text: "text-red-700", ring: "stroke-status-critical" };
  if (daysLeft <= 7) return { bg: "bg-status-warning/15 border-status-warning/40", text: "text-amber-800", ring: "stroke-status-warning" };
  return { bg: "bg-status-warning/5 border-status-warning/20", text: "text-amber-700", ring: "stroke-status-warning" };
}

export function ExamCountdownCard({ plan }: { plan: ExamPlan }) {
  const urgency = urgencyClasses(plan.days_left);

  return (
    <div className={`flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm shadow-ink-primary/5 ${urgency.bg}`}>
      <div>
        <p className={`text-2xl font-bold ${urgency.text}`}>
          {plan.days_left} {plan.days_left === 1 ? "day" : "days"} left
        </p>
        <p className="text-sm text-ink-secondary">
          Exam on {new Date(plan.exam_date).toLocaleDateString()} · Readiness: {plan.readiness_pct}%
        </p>
      </div>
      <ProgressRing percent={plan.readiness_pct} size={64} strokeWidth={6} colorClass={urgency.ring} />
    </div>
  );
}
