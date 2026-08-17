"use client";

import { useParams } from "next/navigation";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { SourcePassagePanel } from "@/components/shared/SourcePassagePanel";
import { useAttempt } from "@/hooks/useDashboard";

export default function ReviewPage() {
  const params = useParams<{ attemptId: string }>();
  const { data: attempt, isLoading } = useAttempt(params.attemptId);

  if (isLoading) return <LoadingSpinner label="Loading attempt…" />;
  if (!attempt) return <p className="text-sm text-gray-500">Attempt not found.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Your answer</h1>
        <p className="rounded border p-3">{attempt.student_answer}</p>
        <p className="text-lg font-semibold">Score: {Math.round((attempt.score ?? 0) * 100)}%</p>
        <p className="text-sm text-gray-700">{attempt.feedback}</p>
      </div>
      <div>
        <h2 className="mb-3 text-xl font-bold">Source</h2>
        <SourcePassagePanel
          content={attempt.source_passage ?? "Source passage unavailable."}
          pageRef={attempt.source_page_ref}
        />
      </div>
    </div>
  );
}
