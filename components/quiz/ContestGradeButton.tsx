"use client";

import { useState } from "react";

import { useContestGrade } from "@/hooks/useQuizSession";

export function ContestGradeButton({ attemptId }: { attemptId: string }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const contestMutation = useContestGrade(attemptId);

  if (contestMutation.isSuccess) {
    return <p className="text-sm text-gray-500">Contest submitted — you'll hear back on this grade.</p>;
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-sm text-gray-500 underline">
        Contest this grade
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded border p-3">
      <label className="text-sm font-medium">Why do you think this grade is wrong?</label>
      <textarea
        className="rounded border p-2 text-sm"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={() => note.trim() && contestMutation.mutate(note.trim())}
          disabled={!note.trim() || contestMutation.isPending}
          className="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-50"
        >
          {contestMutation.isPending ? "Submitting…" : "Submit"}
        </button>
        <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
