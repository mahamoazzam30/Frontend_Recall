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
    <div className="card-elevated flex flex-col gap-6 p-6">
      <p className="text-xl font-semibold text-ink-primary leading-relaxed">{question.prompt}</p>
      <div className="flex flex-col gap-3">
        {question.choices?.map((choice) => (
          <label
            key={choice}
            className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
              selected === choice
                ? "border-brand-600 bg-brand-50 shadow-soft"
                : "border-border-light bg-surface-card hover:border-brand-300 hover:bg-surface-page"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === choice
                  ? "border-brand-600 bg-brand-600"
                  : "border-border-medium"
              }`}>
                {selected === choice && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-medium ${
                selected === choice ? "text-brand-700" : "text-ink-primary"
              }`}>
                {choice}
              </span>
            </div>
          </label>
        ))}
      </div>
      <button 
        onClick={() => selected && onSubmit(selected)} 
        disabled={!selected || disabled} 
        className="btn-primary w-full py-3"
      >
        Submit answer
      </button>
    </div>
  );
}
