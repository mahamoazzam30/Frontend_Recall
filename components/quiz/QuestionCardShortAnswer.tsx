"use client";

import { useState } from "react";

import { Question } from "@/lib/types";

export function QuestionCardShortAnswer({
  question,
  onSubmit,
  disabled,
  isGrading,
}: {
  question: Question;
  onSubmit: (answer: string) => void;
  disabled: boolean;
  isGrading: boolean;
}) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">{question.prompt}</p>
      <textarea
        className="min-h-[120px] rounded border p-2"
        placeholder="Type your answer…"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={() => answer.trim() && onSubmit(answer.trim())}
        disabled={!answer.trim() || disabled}
        className="self-start rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isGrading ? "Grading…" : "Submit"}
      </button>
    </div>
  );
}
