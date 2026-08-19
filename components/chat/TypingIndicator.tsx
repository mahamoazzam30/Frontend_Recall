import { ChatAvatar } from "@/components/chat/ChatAvatar";

export function TypingIndicator() {
  return (
    <div className="message-in flex items-start gap-3">
      <ChatAvatar role="assistant" />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-hairline bg-surface-card px-4 py-3 shadow-sm">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-muted [animation-delay:0ms]" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-muted [animation-delay:150ms]" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-muted [animation-delay:300ms]" />
      </div>
    </div>
  );
}
