"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCourses } from "@/hooks/useCourses";

export default function QuizLauncherPage() {
  const { data: courses, isLoading } = useCourses();
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  function startSession() {
    if (!courseId) return;
    router.push(`/quiz/${courseId}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-purple-700">Start a quiz session</h1>

      {isLoading ? (
        <p className="text-sm text-ink-muted">Loading courses…</p>
      ) : courses && courses.length > 0 ? (
        <div className="flex gap-2">
          <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <option value="">Select a course…</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button onClick={startSession} disabled={!courseId} className="btn-primary">
            Start session
          </button>
        </div>
      ) : (
        <p className="text-sm text-ink-muted">Upload some materials first to start a quiz.</p>
      )}
    </div>
  );
}
