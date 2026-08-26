"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatAvatar } from "@/components/chat/ChatAvatar";
import { ChatSource } from "@/lib/types";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  createdAt: number;
  isError?: boolean;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md p-1 text-ink-muted opacity-0 transition hover:bg-ink-primary/5 hover:text-ink-primary group-hover:opacity-100"
      title="Copy answer"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 16V6a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function SourceList({ sources }: { sources: ChatSource[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 w-full max-w-[85%]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-hairline bg-surface-card px-2.5 py-1 text-xs font-medium text-ink-muted transition hover:border-seq-500/30 hover:text-seq-600"
      >
        <svg viewBox="0 0 24 24" fill="none" className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`}>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {sources.length} source{sources.length !== 1 ? "s" : ""}
      </button>

      {open && (
        <ul className="mt-2 flex flex-col gap-2">
          {sources.map((s, si) => (
            <li key={si} className="flex gap-2 rounded-lg border border-hairline bg-surface-card p-3 text-xs">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-seq-100 text-[10px] font-semibold text-seq-700">
                {si + 1}
              </span>
              <div className="flex flex-col gap-1">
                {s.page_ref && <span className="font-semibold text-ink-primary">{s.page_ref}</span>}
                <p className="leading-relaxed text-ink-secondary">
                  {s.content.slice(0, 220)}
                  {s.content.length > 220 ? "…" : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="message-in flex items-start justify-end gap-3">
        <div className="flex max-w-[85%] flex-col items-end gap-1">
          <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-seq-600 to-seq-500 px-4 py-2.5 text-sm text-white shadow-sm">
            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          </div>
          <span className="px-1 text-[11px] text-ink-muted">{formatTime(message.createdAt)}</span>
        </div>
        <ChatAvatar role="user" />
      </div>
    );
  }

  return (
    <div className="message-in group flex items-start gap-3">
      <ChatAvatar role="assistant" />
      <div className="flex max-w-[85%] flex-col items-start gap-1">
        <div
          className={`relative rounded-2xl rounded-tl-sm border px-4 py-3 text-sm shadow-sm ${
            message.isError
              ? "border-status-critical/30 bg-status-critical/5 text-status-critical"
              : "border-hairline bg-surface-card text-ink-primary"
          }`}
        >
          {!message.isError && (
            <div className="absolute -top-2 right-2">
              <CopyButton text={message.content} />
            </div>
          )}
          {message.isError ? (
            <p className="leading-relaxed">{message.content}</p>
          ) : (
            <div className="chat-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <span className="px-1 text-[11px] text-ink-muted">{formatTime(message.createdAt)}</span>
        {message.sources && message.sources.length > 0 && <SourceList sources={message.sources} />}
      </div>
    </div>
  );
}
