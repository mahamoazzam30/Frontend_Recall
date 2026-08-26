import Link from "next/link";

import { COLOR_TAG_ACCENT, COLOR_TAG_RING } from "@/lib/colorTags";
import { CourseListItem } from "@/lib/types";
import { ProgressRing } from "@/components/shared/ProgressRing";

export function CourseCard({ course }: { course: CourseListItem }) {
  const accent = course.color_tag ? COLOR_TAG_ACCENT[course.color_tag] : "bg-ink-muted";
  const ringColor = course.color_tag ? COLOR_TAG_RING[course.color_tag] : "stroke-ink-muted";

  return (
    <Link href={`/courses/${course.id}`} className="block group">
      <div className="card-elevated overflow-hidden transition-all hover:shadow-strong hover:-translate-y-1">
        <div className={`h-2 ${accent}`} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="truncate text-lg font-semibold text-ink-primary group-hover:text-brand-600 transition-colors">
                  {course.name}
                </h3>
                {!course.is_owner && (
                  <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
                    Shared
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-secondary">Due today: {course.due_count}</p>
            </div>
            <ProgressRing percent={course.mastery_pct} size={64} strokeWidth={6} colorClass={ringColor} />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            <span className="text-sm font-medium text-ink-secondary">
              Mastery: {Math.round(course.mastery_pct)}%
            </span>
            <span className="text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors">
              Continue →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
