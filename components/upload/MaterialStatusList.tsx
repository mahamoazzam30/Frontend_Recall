"use client";

import { Material } from "@/lib/types";

const STATUS_DOT: Record<Material["status"], string> = {
  processing: "bg-status-warning",
  ready: "bg-status-good",
  needs_review: "bg-status-serious",
  failed: "bg-status-critical",
};

const STATUS_TEXT: Record<Material["status"], string> = {
  processing: "text-amber-700",
  ready: "text-status-good",
  needs_review: "text-status-serious",
  failed: "text-status-critical",
};

const STATUS_LABELS: Record<Material["status"], string> = {
  processing: "Processing…",
  ready: "Ready",
  needs_review: "Needs review",
  failed: "Failed",
};

const EXTENSION_LABEL: Record<Material["source_type"], string> = {
  pdf: "PDF",
  md: "MD",
  txt: "TXT",
};

export function MaterialStatusList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-ink-primary/15 p-4 text-center text-sm text-ink-muted">
        No materials uploaded yet — add your first file above.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {materials.map((material) => (
        <li key={material.id} className="card flex items-center gap-3 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-seq-500/10 text-[10px] font-bold tracking-tight text-seq-600">
            {EXTENSION_LABEL[material.source_type]}
          </span>
          <span className="min-w-0 flex-1 truncate text-ink-primary">{material.filename}</span>
          <span className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${STATUS_TEXT[material.status]}`}>
            <span
              className={`h-2 w-2 rounded-full ${STATUS_DOT[material.status]} ${
                material.status === "processing" ? "animate-pulse" : ""
              }`}
            />
            {STATUS_LABELS[material.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
