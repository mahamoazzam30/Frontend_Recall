"use client";

import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useAskQuestion } from "@/hooks/useChat";
import { ChatSource } from "@/lib/types";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
}

export default function CourseChatPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const ask = useAskQuestion(courseId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q || ask.isPending) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setQuestion("");

    const res = await ask.mutateAsync(q);
    setMessages((prev) => [...prev, { role: "assistant", content: res.answer, sources: res.sources }]);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-teal-700">Ask about this course</h1>

      <div className="card flex min-h-[300px] flex-col gap-4 p-5">
        {messages.length === 0 && (
          <p className="text-sm text-ink-muted">
            Ask a question about your uploaded materials — answers are grounded only in what you've uploaded.
          </p>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "bg-seq-600 text-white" : "bg-surface-page text-ink-primary"
              }`}
            >
              {m.content}
            </div>
            {m.sources && m.sources.length > 0 && (
              <details className="max-w-[80%] text-xs text-ink-muted">
                <summary className="cursor-pointer">Sources ({m.sources.length})</summary>
                <ul className="mt-1 flex flex-col gap-1">
                  {m.sources.map((s, si) => (
                    <li key={si} className="rounded border border-ink-primary/10 bg-surface-page p-2">
                      {s.page_ref && <span className="font-medium">{s.page_ref} — </span>}
                      {s.content.slice(0, 160)}
                      {s.content.length > 160 ? "…" : ""}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}

        {ask.isPending && <LoadingSpinner label="Thinking…" />}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Ask a question about this course…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={ask.isPending}
        />
        <button type="submit" disabled={!question.trim() || ask.isPending} className="btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}
