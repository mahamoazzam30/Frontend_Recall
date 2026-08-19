import { useRouter } from "next/navigation";

import { MasteryEntry } from "@/lib/types";

export function TodaysPlanList({
  courseId,
  targetConceptIds,
  mastery,
}: {
  courseId: string;
  targetConceptIds: string[];
  mastery: MasteryEntry[];
}) {
  const router = useRouter();
  const nameById = new Map(mastery.map((m) => [m.concept_id, m.concept_name]));

  if (targetConceptIds.length === 0) {
    return <p className="text-sm text-ink-muted">Nothing scheduled for today — you're on track.</p>;
  }

  function practiceNow() {
    const query = targetConceptIds.map((id) => `concept=${id}`).join("&");
    router.push(`/quiz/${courseId}?${query}`);
  }

  return (
    <div className="card p-4">
      <h3 className="mb-3 font-semibold text-ink-primary">Today's plan</h3>
      <ul className="mb-4 flex flex-col gap-2">
        {targetConceptIds.map((id) => (
          <li key={id} className="rounded-lg border border-ink-primary/10 bg-surface-page p-2 text-sm text-ink-primary">
            {nameById.get(id) ?? "Concept"}
          </li>
        ))}
      </ul>
      <button onClick={practiceNow} className="btn-primary w-full">
        Practice now
      </button>
    </div>
  );
}
