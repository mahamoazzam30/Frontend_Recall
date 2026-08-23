export function ProgressRing({
  percent,
  size = 64,
  strokeWidth = 6,
  colorClass = "stroke-seq-500",
  label,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-hairline"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`fill-none transition-[stroke-dashoffset] duration-500 ${colorClass}`}
        />
      </svg>
      <span className="absolute text-sm font-semibold">{label ?? `${Math.round(clamped)}%`}</span>
    </div>
  );
}
