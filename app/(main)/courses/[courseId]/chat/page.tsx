"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatMessage, ChatMessageData } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useAskQuestion } from "@/hooks/useChat";
import { ApiError } from "@/lib/api";

const SUGGESTED_PROMPTS = [
  "What is this course about?",
  "Summarize the key concepts I should know",
  "What topics are most likely to be tested?",
  "Explain the hardest concept in simple terms",
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function CourseChatPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const ask = useAskQuestion(courseId);

  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [question, setQuestion] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ask.isPending]);

  async function sendQuestion(q: string) {
    if (!q.trim() || ask.isPending) return;

    setMessages((prev) => [...prev, { id: makeId(), role: "user", content: q.trim(), createdAt: Date.now() }]);
    setQuestion("");

    try {
      const res = await ask.mutateAsync(q.trim());
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "assistant", content: res.answer, sources: res.sources, createdAt: Date.now() },
      ]);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong reaching the assistant. Try again.";
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "assistant", content: message, createdAt: Date.now(), isError: true },
      ]);
    }
  }

  function handleSubmit() {
    void sendQuestion(question);
  }

  function handleClear() {
    setMessages([]);
  }

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-primary">Ask about this course</h1>
          <p className="mt-0.5 text-sm text-ink-muted">
            Grounded strictly in the materials you've uploaded — every answer cites its source.
          </p>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClear} className="btn-secondary text-xs">
            Clear chat
          </button>
        )}
      </div>

      <div className="card flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-seq-100 text-seq-700">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M12 2a1 1 0 0 1 1 1v1.06A7.002 7.002 0 0 1 19 11v1h.5a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5H19a7 7 0 0 1-7 7 7 7 0 0 1-7-7h-.5A1.5 1.5 0 0 1 3 14.5v-2A1.5 1.5 0 0 1 4.5 11H5v-1a7.002 7.002 0 0 1 6-6.94V3a1 1 0 0 1 1-1Z"
                    fill="currentColor"
                  />
                  <circle cx="9" cy="13" r="1.4" fill="white" />
                  <circle cx="15" cy="13" r="1.4" fill="white" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-ink-primary">Ask anything about your uploaded materials</p>
                <p className="mt-1 text-sm text-ink-muted">
                  Answers are grounded only in what you've uploaded for this course.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => void sendQuestion(prompt)}
                    className="rounded-full border border-hairline bg-surface-page px-3 py-1.5 text-xs font-medium text-ink-secondary transition hover:border-seq-500/40 hover:text-seq-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}

          {ask.isPending && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-hairline p-4">
          <ChatComposer value={question} onChange={setQuestion} onSubmit={handleSubmit} disabled={ask.isPending} />
        </div>
      </div>
    </div>
  );
}
