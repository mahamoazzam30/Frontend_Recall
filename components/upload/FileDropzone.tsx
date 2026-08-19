"use client";

import { DragEvent, useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [".pdf", ".md", ".txt"];
const FILE_TYPE_LABELS = ["PDF", "Markdown", "TXT"];

export function FileDropzone({
  onFilesSelected,
  disabled,
}: {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    onFilesSelected(Array.from(e.dataTransfer.files));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition ${
        disabled
          ? "cursor-not-allowed border-ink-primary/10 opacity-60"
          : isDragging
            ? "cursor-pointer border-seq-500 bg-seq-100/40"
            : "cursor-pointer border-ink-primary/15 hover:border-seq-400/50 hover:bg-seq-500/5"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
          isDragging ? "bg-seq-500/15 text-seq-600" : "bg-ink-primary/5 text-ink-muted"
        }`}
      >
        {disabled ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-primary/15 border-t-seq-600" />
        ) : (
          <UploadCloudIcon className="h-6 w-6" />
        )}
      </span>
      <div>
        <p className="font-medium text-ink-primary">
          {disabled ? "Uploading…" : "Drag & drop files here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-ink-muted">Recall reads these and turns them into quizzes & flashcards</p>
      </div>
      <div className="flex gap-1.5">
        {FILE_TYPE_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-full border border-ink-primary/10 bg-surface-page px-2.5 py-0.5 text-[11px] font-medium text-ink-secondary"
          >
            {label}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        disabled={disabled}
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
      />
    </div>
  );
}

function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.3 7.03 4 4 0 0 1 17 15" />
      <path d="M12 12v7" />
      <path d="M9.5 14.5 12 12l2.5 2.5" />
    </svg>
  );
}
