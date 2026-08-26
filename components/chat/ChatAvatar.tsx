export function ChatAvatar({ role }: { role: "user" | "assistant" }) {
  if (role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-seq-600 to-seq-450 text-xs font-semibold text-white shadow-sm">
        You
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-seq-500/20 bg-seq-100 text-seq-700 shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M12 2a1 1 0 0 1 1 1v1.06A7.002 7.002 0 0 1 19 11v1h.5a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5H19a7 7 0 0 1-7 7 7 7 0 0 1-7-7h-.5A1.5 1.5 0 0 1 3 14.5v-2A1.5 1.5 0 0 1 4.5 11H5v-1a7.002 7.002 0 0 1 6-6.94V3a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
        <circle cx="9" cy="13" r="1.4" fill="white" />
        <circle cx="15" cy="13" r="1.4" fill="white" />
      </svg>
    </div>
  );
}
