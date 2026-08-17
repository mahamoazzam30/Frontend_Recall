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
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.choices?.map((choice) => (
          <label
            key={choice}
            className={`cursor-pointer rounded border p-3 ${selected === choice ? "border-black bg-gray-50" : ""}`}
          >
            <input
              type="radio"
              name="mcq-choice"
              className="mr-2"
              checked={selected === choice}
              onChange={() => setSelected(choice)}
              disabled={disabled}
            />
            {choice}
          </label>
        ))}
      </div>
      <button
        onClick={() => selected && onSubmit(selected)}
        disabled={!selected || disabled}
        className="self-start rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
