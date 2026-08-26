"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useJoinCourse } from "@/hooks/useCourses";
import { ApiError } from "@/lib/api";

export function JoinCourseForm({ onDone }: { onDone: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const joinCourse = useJoinCourse();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const course = await joinCourse.mutateAsync(code.trim());
      onDone();
      router.push(`/courses/${course.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't join that course.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-2 p-4">
      <label className="text-sm font-medium text-ink-primary">Study group invite code</label>
      <p className="text-xs text-ink-muted">
        Ask the course owner for their course link — the ID at the end of it is the invite code.
      </p>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste course ID…"
          className="input flex-1"
          autoFocus
        />
        <button type="submit" disabled={!code.trim() || joinCourse.isPending} className="btn-primary">
          {joinCourse.isPending ? "Joining…" : "Join"}
        </button>
      </div>
      {error && <p className="text-xs text-status-critical">{error}</p>}
    </form>
  );
}
