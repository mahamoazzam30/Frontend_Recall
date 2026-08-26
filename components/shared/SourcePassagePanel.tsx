export function SourcePassagePanel({ content, pageRef }: { content: string; pageRef?: string | null }) {
  return (
    <div className="card border-l-4 border-l-seq-500 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Source passage{pageRef ? ` — ${pageRef}` : ""}
      </p>
      <p className="whitespace-pre-wrap text-sm text-ink-secondary">{content}</p>
    </div>
  );
}
