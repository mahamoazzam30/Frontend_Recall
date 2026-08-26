"use client";

import { KeyboardEvent, useEffect, useRef } from "react";

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatComposer({ value, onChange, onSubmit, disabled }: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-ink-primary/15 bg-surface-card p-2 shadow-sm shadow-ink-primary/5 focus-within:border-seq-500 focus-within:ring-2 focus-within:ring-seq-500/20">
      <textarea
        ref={textareaRef}
        rows={1}
        className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none"
        placeholder="Ask a question about this course… (Enter to send, Shift+Enter for a new line)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-seq-600 text-white shadow-sm shadow-seq-600/20 transition hover:bg-seq-650 disabled:opacity-40 disabled:hover:bg-seq-600"
        title="Send"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M4 12 20 4l-6 16-3-7-7-1Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      </button>
    </div>
  );
}
