import { useRouter } from "next/navigation";

import { WeakSpot } from "@/lib/types";

function masteryBadgeClasses(pct: number): string {
  if (pct < 25) return "bg-red-100 text-red-800";
  if (pct < 50) return "bg-orange-100 text-orange-800";
  return "bg-yellow-100 text-yellow-800";
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
    <div className="rounded-lg border p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold">{spot.concept_name}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${masteryBadgeClasses(spot.mastery_pct)}`}>
          {spot.mastery_pct}% mastery
        </span>
      </div>
      {spot.error_note && <p className="mb-2 text-sm text-gray-600">{spot.error_note}</p>}
      <p className="mb-3 text-xs text-gray-500">{daysAgo(spot.last_reviewed_at)}</p>
      <button
        onClick={() => router.push(`/quiz/${courseId}?concept=${spot.concept_id}`)}
        className="w-full rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        Practice this
      </button>
    </div>
  );
}
