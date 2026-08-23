"use client";

import { useState } from "react";

import { Question } from "@/lib/types";

export function QuestionCardMCQ({
  question,
  onSubmit,
  disabled,
}: {
  question: Question;
  onSubmit: (answer: string) => void;
  disabled: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="card flex flex-col gap-4 p-5">
      <p className="text-lg font-medium text-ink-primary">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.choices?.map((choice) => (
          <label
            key={choice}
            className={`cursor-pointer rounded-lg border p-3 transition ${
              selected === choice
                ? "border-seq-500 bg-seq-100/60"
                : "border-ink-primary/10 hover:border-ink-primary/20"
            }`}
          >
            <input
              type="radio"
              name="mcq-choice"
              className="mr-2 accent-seq-600"
              checked={selected === choice}
              onChange={() => setSelected(choice)}
              disabled={disabled}
            />
            {choice}
          </label>
        ))}
      </div>
      <button onClick={() => selected && onSubmit(selected)} disabled={!selected || disabled} className="btn-primary self-start">
        Submit
      </button>
    </div>
  );
}
