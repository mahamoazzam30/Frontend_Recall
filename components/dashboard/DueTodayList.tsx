import { DueTodayEntry } from "@/lib/types";

export function DueTodayList({ entries }: { entries: DueTodayEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-500">Nothing due right now — check back later.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((entry) => (
        <li key={entry.concept_id} className="flex items-center justify-between rounded border p-3">
          <span>{entry.concept_name}</span>
          <span className="text-xs text-gray-500">due {new Date(entry.due_at).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
