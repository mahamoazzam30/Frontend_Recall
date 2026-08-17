export function SourcePassagePanel({ content, pageRef }: { content: string; pageRef?: string | null }) {
  return (
    <div className="rounded border bg-gray-50 p-4">
      <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
        Source passage{pageRef ? ` — ${pageRef}` : ""}
      </p>
      <p className="whitespace-pre-wrap text-sm text-gray-800">{content}</p>
    </div>
  );
}
