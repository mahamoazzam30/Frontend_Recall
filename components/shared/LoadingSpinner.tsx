export function LoadingSpinner({ label, size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <span className={`animate-spin rounded-full border-2 border-border-light border-t-brand-600 ${sizeClasses[size]}`} />
      {label && <p className="text-sm text-ink-secondary font-medium">{label}</p>}
    </div>
  );
}
