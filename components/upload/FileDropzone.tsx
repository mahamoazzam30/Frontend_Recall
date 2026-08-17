"use client";

import { DragEvent, useRef, useState } from "react";

const ACCEPTED_EXTENSIONS = [".pdf", ".md", ".txt"];

export function FileDropzone({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    onFilesSelected(Array.from(e.dataTransfer.files));
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition ${
        isDragging ? "border-seq-500 bg-seq-100/40" : "border-ink-primary/15 hover:border-ink-primary/25"
      }`}
    >
      <p className="font-medium text-ink-primary">Drag & drop files here, or click to browse</p>
      <p className="mt-1 text-sm text-ink-muted">PDF, Markdown, or TXT</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="hidden"
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
      />
    </div>
  );
}
