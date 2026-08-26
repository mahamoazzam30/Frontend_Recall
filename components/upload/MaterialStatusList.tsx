"use client";

import { Material } from "@/lib/types";

const STATUS_CONFIG: Record<Material["status"], { dot: string; text: string; badge: string }> = {
  processing: { dot: "bg-status-warning", text: "text-accent-amber-700", badge: "badge-warning" },
  ready: { dot: "bg-status-success", text: "text-accent-emerald-700", badge: "badge-success" },
  needs_review: { dot: "bg-status-error", text: "text-accent-rose-700", badge: "badge-error" },
  failed: { dot: "bg-status-error", text: "text-accent-rose-700", badge: "badge-error" },
};

const STATUS_LABELS: Record<Material["status"], string> = {
  processing: "Processing…",
  ready: "Ready",
  needs_review: "Needs review",
  failed: "Failed",
};

const EXTENSION_CONFIG: Record<Material["source_type"], { label: string; color: string }> = {
  pdf: { label: "PDF", color: "bg-accent-rose-100 text-accent-rose-700" },
  md: { label: "MD", color: "bg-accent-blue-100 text-accent-blue-700" },
  txt: { label: "TXT", color: "bg-accent-emerald-100 text-accent-emerald-700" },
};

export function MaterialStatusList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-50 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-ink-secondary">No materials uploaded yet — add your first file above.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {materials.map((material) => {
        const config = STATUS_CONFIG[material.status];
        const extConfig = EXTENSION_CONFIG[material.source_type];
        return (
          <li key={material.id} className="card flex items-center gap-4 p-4 hover-lift">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${extConfig.color} text-xs font-bold`}>
              {extConfig.label}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-ink-primary">{material.filename}</span>
            <span className={`badge ${config.badge} flex items-center gap-2`}>
              <span
                className={`h-2 w-2 rounded-full ${config.dot} ${
                  material.status === "processing" ? "animate-pulse" : ""
                }`}
              />
              {STATUS_LABELS[material.status]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
