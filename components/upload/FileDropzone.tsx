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
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
        disabled
          ? "cursor-not-allowed border-border-light opacity-60"
          : isDragging
            ? "cursor-pointer border-brand-600 bg-brand-50 shadow-medium scale-[1.02]"
            : "cursor-pointer border-border-light bg-surface-page hover:border-brand-300 hover:bg-brand-50/50 hover:shadow-soft"
      }`}
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full transition-all ${
          isDragging ? "bg-brand-100 text-brand-600 shadow-sm" : "bg-brand-50 text-brand-600"
        }`}
      >
        {disabled ? (
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-border-light border-t-brand-600" />
        ) : (
          <UploadCloudIcon className="h-8 w-8" />
        )}
      </span>
      <div>
        <p className="text-lg font-semibold text-ink-primary">
          {disabled ? "Uploading…" : "Drag & drop files here, or click to browse"}
        </p>
        <p className="mt-2 text-sm text-ink-secondary">Recall reads these and turns them into quizzes & flashcards</p>
      </div>
      <div className="flex gap-2">
        {FILE_TYPE_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border-light bg-white px-3 py-1 text-xs font-semibold text-ink-secondary"
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
      strokeWidth={2}
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
