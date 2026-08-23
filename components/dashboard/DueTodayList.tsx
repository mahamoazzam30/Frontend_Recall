import { DueTodayEntry } from "@/lib/types";

export function DueTodayList({ entries }: { entries: DueTodayEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-ink-muted">Nothing due right now — check back later.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((entry) => (
        <li
          key={entry.concept_id}
          className="flex items-center justify-between rounded-xl border border-ink-primary/10 bg-surface-card p-3"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-status-warning" />
            <span className="text-ink-primary">{entry.concept_name}</span>
          </div>
          <span className="text-xs text-ink-muted">due {new Date(entry.due_at).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
