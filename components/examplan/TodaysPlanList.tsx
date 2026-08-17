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
    return <p className="text-sm text-gray-500">Nothing scheduled for today — you're on track.</p>;
  }

  function practiceNow() {
    const query = targetConceptIds.map((id) => `concept=${id}`).join("&");
    router.push(`/quiz/${courseId}?${query}`);
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-3 font-semibold">Today's plan</h3>
      <ul className="mb-4 flex flex-col gap-2">
        {targetConceptIds.map((id) => (
          <li key={id} className="rounded border p-2 text-sm">
            {nameById.get(id) ?? "Concept"}
          </li>
        ))}
      </ul>
      <button onClick={practiceNow} className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white">
        Practice now
      </button>
    </div>
  );
}
