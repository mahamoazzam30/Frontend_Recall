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
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">{question.prompt}</p>
      <input
        className="rounded border p-2"
        placeholder="Fill in the blank"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={() => answer.trim() && onSubmit(answer.trim())}
        disabled={!answer.trim() || disabled}
        className="self-start rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
