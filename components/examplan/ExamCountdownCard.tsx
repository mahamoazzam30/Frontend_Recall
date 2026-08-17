import { ExamPlan } from "@/lib/types";
import { ProgressRing } from "@/components/shared/ProgressRing";

function urgencyClasses(daysLeft: number): { bg: string; text: string; ring: string } {
  if (daysLeft <= 2) return { bg: "bg-red-50 border-red-300", text: "text-red-700", ring: "stroke-red-500" };
  if (daysLeft <= 7) return { bg: "bg-amber-100 border-amber-300", text: "text-amber-800", ring: "stroke-amber-500" };
  return { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", ring: "stroke-amber-400" };
}

export function ExamCountdownCard({ plan }: { plan: ExamPlan }) {
  const urgency = urgencyClasses(plan.days_left);

  return (
    <div className={`flex items-center justify-between gap-4 rounded-lg border p-4 ${urgency.bg}`}>
      <div>
        <p className={`text-2xl font-bold ${urgency.text}`}>
          {plan.days_left} {plan.days_left === 1 ? "day" : "days"} left
        </p>
        <p className="text-sm text-gray-600">
          Exam on {new Date(plan.exam_date).toLocaleDateString()} · Readiness: {plan.readiness_pct}%
        </p>
      </div>
      <ProgressRing percent={plan.readiness_pct} size={64} strokeWidth={6} colorClass={urgency.ring} />
    </div>
  );
}
