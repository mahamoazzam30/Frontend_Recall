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
    <div className="card flex flex-col gap-4 p-5">
      <p className="text-lg font-medium text-ink-primary">{question.prompt}</p>
      <textarea
        className="input min-h-[120px]"
        placeholder="Type your answer…"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={() => answer.trim() && onSubmit(answer.trim())}
        disabled={!answer.trim() || disabled}
        className="btn-primary self-start"
      >
        {isGrading ? "Grading…" : "Submit"}
      </button>
    </div>
  );
}
