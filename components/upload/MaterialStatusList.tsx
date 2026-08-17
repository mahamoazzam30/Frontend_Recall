"use client";

import { Material } from "@/lib/types";

const STATUS_STYLES: Record<Material["status"], string> = {
  processing: "bg-status-warning/15 text-yellow-800",
  ready: "bg-status-good/15 text-green-800",
  needs_review: "bg-status-serious/20 text-orange-800",
  failed: "bg-status-critical/15 text-red-800",
};

const STATUS_LABELS: Record<Material["status"], string> = {
  processing: "Processing…",
  ready: "Ready",
  needs_review: "Needs review",
  failed: "Failed",
};

export function MaterialStatusList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return <p className="text-sm text-ink-muted">No materials uploaded yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {materials.map((material) => (
        <li key={material.id} className="card flex items-center justify-between p-3">
          <span className="truncate text-ink-primary">{material.filename}</span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[material.status]}`}>
            {STATUS_LABELS[material.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
