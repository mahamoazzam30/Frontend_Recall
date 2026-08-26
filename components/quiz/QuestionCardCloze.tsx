"use client";

import { useState } from "react";

import { Question } from "@/lib/types";

export function QuestionCardCloze({
  question,
  onSubmit,
  disabled,
}: {
  question: Question;
  onSubmit: (answer: string) => void;
  disabled: boolean;
}) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="card flex flex-col gap-4 p-5">
      <p className="text-lg font-medium text-ink-primary">{question.prompt}</p>
      <input
        className="input"
        placeholder="Fill in the blank"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={() => answer.trim() && onSubmit(answer.trim())}
        disabled={!answer.trim() || disabled}
        className="btn-primary self-start"
      >
        Submit
      </button>
    </div>
  );
}
