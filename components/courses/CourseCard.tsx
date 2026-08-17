import Link from "next/link";

import { COLOR_TAG_ACCENT, COLOR_TAG_RING } from "@/lib/colorTags";
import { CourseListItem } from "@/lib/types";
import { ProgressRing } from "@/components/shared/ProgressRing";

export function CourseCard({ course }: { course: CourseListItem }) {
  const accent = course.color_tag ? COLOR_TAG_ACCENT[course.color_tag] : "bg-ink-muted";
  const ringColor = course.color_tag ? COLOR_TAG_RING[course.color_tag] : "stroke-ink-muted";

  return (
    <div className="card overflow-hidden transition hover:shadow-md hover:shadow-ink-primary/10">
      <div className={`h-1.5 ${accent}`} />
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-ink-primary">{course.name}</h3>
          <p className="text-sm text-ink-secondary">Due today: {course.due_count}</p>
        </div>
        <ProgressRing percent={course.mastery_pct} size={56} strokeWidth={5} colorClass={ringColor} />
      </div>
      <div className="border-t border-hairline p-3">
        <Link href={`/courses/${course.id}`} className="btn-primary block w-full text-center">
          Continue
        </Link>
      </div>
    </div>
  );
}
