"use client";

import { Material } from "@/lib/types";

const STATUS_STYLES: Record<Material["status"], string> = {
  processing: "bg-yellow-100 text-yellow-800",
  ready: "bg-green-100 text-green-800",
  needs_review: "bg-orange-100 text-orange-800",
  failed: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<Material["status"], string> = {
  processing: "Processing…",
  ready: "Ready",
  needs_review: "Needs review",
  failed: "Failed",
};

export function MaterialStatusList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return <p className="text-sm text-gray-500">No materials uploaded yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {materials.map((material) => (
        <li key={material.id} className="flex items-center justify-between rounded border p-3">
          <span className="truncate">{material.filename}</span>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[material.status]}`}>
            {STATUS_LABELS[material.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
