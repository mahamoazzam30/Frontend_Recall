"use client";

import { useParams, useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { WeakSpotCard } from "@/components/weakspots/WeakSpotCard";
import { usePracticeWeakSpots, useWeakSpots } from "@/hooks/useWeakSpots";

export default function WeakSpotsPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const router = useRouter();

  const { data: weakSpots, isLoading } = useWeakSpots(courseId);
  const practiceAll = usePracticeWeakSpots(courseId);

  async function handlePracticeAll() {
    await practiceAll.mutateAsync();
    router.push(`/quiz/${courseId}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weak spots</h1>
        {weakSpots && weakSpots.length > 0 && (
          <button
            onClick={handlePracticeAll}
            disabled={practiceAll.isPending}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {practiceAll.isPending ? "Starting…" : "Practice all weak spots"}
          </button>
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner label="Finding weak spots…" />
      ) : weakSpots && weakSpots.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {weakSpots.map((spot) => (
            <WeakSpotCard key={spot.concept_id} courseId={courseId} spot={spot} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No weak spots right now — keep practicing to stay ahead.</p>
      )}
    </div>
  );
}
