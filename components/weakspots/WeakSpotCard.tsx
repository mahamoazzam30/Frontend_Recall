import { useRouter } from "next/navigation";

import { WeakSpot } from "@/lib/types";

function masteryBadgeClasses(pct: number): string {
  if (pct < 25) return "bg-status-critical/15 text-red-800";
  if (pct < 50) return "bg-status-serious/20 text-orange-800";
  return "bg-status-warning/20 text-yellow-800";
}

function daysAgo(dateStr: string | null): string {
  if (!dateStr) return "Never reviewed";
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Reviewed today";
  return `Last reviewed ${days} day${days === 1 ? "" : "s"} ago`;
}

export function WeakSpotCard({ courseId, spot }: { courseId: string; spot: WeakSpot }) {
  const router = useRouter();

  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-ink-primary">{spot.concept_name}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${masteryBadgeClasses(spot.mastery_pct)}`}>
          {spot.mastery_pct}% mastery
        </span>
      </div>
      {spot.error_note && <p className="mb-2 text-sm text-ink-secondary">{spot.error_note}</p>}
      <p className="mb-3 text-xs text-ink-muted">{daysAgo(spot.last_reviewed_at)}</p>
      <button onClick={() => router.push(`/quiz/${courseId}?concept=${spot.concept_id}`)} className="btn-secondary w-full">
        Practice this
      </button>
    </div>
  );
}
