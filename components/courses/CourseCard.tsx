import Link from "next/link";

import { COLOR_TAG_ACCENT, COLOR_TAG_RING } from "@/lib/colorTags";
import { CourseListItem } from "@/lib/types";
import { ProgressRing } from "@/components/shared/ProgressRing";

export function CourseCard({ course }: { course: CourseListItem }) {
  const accent = course.color_tag ? COLOR_TAG_ACCENT[course.color_tag] : "bg-gray-400";
  const ringColor = course.color_tag ? COLOR_TAG_RING[course.color_tag] : "stroke-gray-500";

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className={`h-1.5 ${accent}`} />
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-gray-500">Due today: {course.due_count}</p>
        </div>
        <ProgressRing percent={course.mastery_pct} size={56} strokeWidth={5} colorClass={ringColor} />
      </div>
      <div className="border-t p-3">
        <Link
          href={`/courses/${course.id}`}
          className="block w-full rounded bg-black px-4 py-2 text-center text-sm font-medium text-white"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
