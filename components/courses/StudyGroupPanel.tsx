"use client";

import { useState } from "react";

import { useCourseMembers } from "@/hooks/useCourses";

export function StudyGroupPanel({ courseId, isOwner }: { courseId: string; isOwner: boolean }) {
  const { data: members, isLoading } = useCourseMembers(courseId);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(courseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card flex flex-col gap-3 p-4">
      <h3 className="font-semibold text-ink-primary">Study group</h3>

      {isOwner ? (
        <div className="flex items-center gap-2">
          <code className="flex-1 truncate rounded-lg border border-ink-primary/10 bg-surface-page px-3 py-2 text-xs text-ink-secondary">
            {courseId}
          </code>
          <button onClick={handleCopy} className="btn-secondary shrink-0 px-3 py-2 text-xs">
            {copied ? "Copied!" : "Copy invite code"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-ink-muted">Shared with you — everyone here tracks their own progress.</p>
      )}

      {isLoading ? (
        <p className="text-sm text-ink-muted">Loading members…</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {members?.map((m) => (
            <li key={m.email} className="flex items-center justify-between text-sm">
              <span className="truncate text-ink-primary">{m.email}</span>
              {m.is_owner && <span className="shrink-0 text-xs text-ink-muted">Owner</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
