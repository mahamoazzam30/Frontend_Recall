"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSubjects } from "@/hooks/useMaterials";

export default function QuizLauncherPage() {
  const { data: subjects, isLoading } = useSubjects();
  const [subjectId, setSubjectId] = useState("");
  const router = useRouter();

  function startSession() {
    if (!subjectId) return;
    router.push(`/quiz/${subjectId}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Start a quiz session</h1>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading subjects…</p>
      ) : subjects && subjects.length > 0 ? (
        <div className="flex gap-2">
          <select className="rounded border p-2" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            <option value="">Select a subject…</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            onClick={startSession}
            disabled={!subjectId}
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
