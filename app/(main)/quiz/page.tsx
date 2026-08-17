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
      <h1 className="text-2xl font-bold">Start a quiz session</h1>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading courses…</p>
      ) : courses && courses.length > 0 ? (
        <div className="flex gap-2">
          <select className="rounded border p-2" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
            <option value="">Select a course…</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={startSession}
            disabled={!courseId}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            Start session
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Upload some materials first to start a quiz.</p>
      )}
    </div>
  );
}
