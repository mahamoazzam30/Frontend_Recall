export function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-muted">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-primary/15 border-t-seq-600" />
      {label ?? "Loading…"}
    </div>
  );
}
