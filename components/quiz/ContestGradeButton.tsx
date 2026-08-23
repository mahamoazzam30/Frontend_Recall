"use client";

import { useState } from "react";

import { useContestGrade } from "@/hooks/useQuizSession";

export function ContestGradeButton({ attemptId }: { attemptId: string }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const contestMutation = useContestGrade(attemptId);

  if (contestMutation.isSuccess) {
    return <p className="text-sm text-ink-muted">Contest submitted — you'll hear back on this grade.</p>;
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-seq-600 underline">
        Contest this grade
      </button>
    );
  }

  return (
    <div className="card flex flex-col gap-2 p-3">
      <label className="text-sm font-medium text-ink-primary">Why do you think this grade is wrong?</label>
      <textarea className="input text-sm" value={note} onChange={(e) => setNote(e.target.value)} />
      <div className="flex gap-2">
        <button
          onClick={() => note.trim() && contestMutation.mutate(note.trim())}
          disabled={!note.trim() || contestMutation.isPending}
          className="btn-primary px-3 py-1"
        >
          {contestMutation.isPending ? "Submitting…" : "Submit"}
        </button>
        <button onClick={() => setOpen(false)} className="text-sm text-ink-muted">
          Cancel
        </button>
      </div>
    </div>
  );
}
