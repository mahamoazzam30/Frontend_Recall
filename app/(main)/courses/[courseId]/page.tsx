"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { StudyGroupPanel } from "@/components/courses/StudyGroupPanel";
import { DueTodayList } from "@/components/dashboard/DueTodayList";
import { MasteryHeatmap } from "@/components/dashboard/MasteryHeatmap";
import { ExamCountdownCard } from "@/components/examplan/ExamCountdownCard";
import { TodaysPlanList } from "@/components/examplan/TodaysPlanList";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { MaterialStatusList } from "@/components/upload/MaterialStatusList";
import { useCourse, useCourseDashboard } from "@/hooks/useCourses";
import { useCreateExamPlan, useExamPlan } from "@/hooks/useExamPlan";
import { useWeakSpots } from "@/hooks/useWeakSpots";
import { COLOR_TAG_ACCENT } from "@/lib/colorTags";

export default function CourseDetailPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const router = useRouter();

  const { data: detail, isLoading } = useCourse(courseId);
  const dashboard = useCourseDashboard(courseId);
  const examPlan = useExamPlan(courseId);
  const weakSpots = useWeakSpots(courseId);
  const createExamPlan = useCreateExamPlan(courseId);

  const [examDate, setExamDate] = useState("");

  if (isLoading || !detail) return <LoadingSpinner label="Loading course…" />;

  const accent = detail.course.color_tag ? COLOR_TAG_ACCENT[detail.course.color_tag] : "bg-ink-muted";

  async function handleSetupExamPlan() {
    if (!examDate) return;
    await createExamPlan.mutateAsync(examDate);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className={`h-8 w-2 rounded-full ${accent}`} />
        <h1 className="text-2xl font-bold text-ink-primary">{detail.course.name}</h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => router.push(`/quiz/${courseId}`)} className="btn-primary">
          Practice this course
        </button>
        <Link href={`/courses/${courseId}/flashcards`} className="btn-secondary">
          Flashcards
        </Link>
        <Link href={`/courses/${courseId}/weak-spots`} className="btn-secondary">
          Weak spots{weakSpots.data && weakSpots.data.length > 0 ? ` (${weakSpots.data.length})` : ""}
        </Link>
        <Link href={`/courses/${courseId}/chat`} className="btn-secondary">
          Ask about this course
        </Link>
      </div>

      {examPlan.data ? (
        <div className="flex flex-col gap-4">
          <ExamCountdownCard plan={examPlan.data} />
          <TodaysPlanList
            courseId={courseId}
            targetConceptIds={examPlan.data.today_target_concept_ids}
            mastery={dashboard.data?.mastery ?? []}
          />
        </div>
      ) : (
        <div className="card p-4">
          <h3 className="mb-2 font-semibold text-ink-primary">Set up exam prep</h3>
          <p className="mb-3 text-sm text-ink-secondary">
            Pick an exam date and Recall will build a day-by-day plan that leans into your weak concepts.
          </p>
          <div className="flex gap-2">
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="input text-sm"
            />
            <button onClick={handleSetupExamPlan} disabled={!examDate || createExamPlan.isPending} className="btn-primary">
              {createExamPlan.isPending ? "Setting up…" : "Set up"}
            </button>
          </div>
        </div>
      )}

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Modules & materials</h2>
        <MaterialStatusList materials={detail.materials} />
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Due today</h2>
        {dashboard.isLoading ? <LoadingSpinner /> : <DueTodayList entries={dashboard.data?.due_today ?? []} />}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-ink-primary">Mastery by concept</h2>
        {dashboard.isLoading ? <LoadingSpinner /> : <MasteryHeatmap entries={dashboard.data?.mastery ?? []} />}
      </section>

      <section>
        <StudyGroupPanel courseId={courseId} isOwner={detail.is_owner} />
      </section>
    </div>
  );
}
