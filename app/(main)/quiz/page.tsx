"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useCourses, useCourseTopics } from "@/hooks/useCourses";
import { COLOR_TAG_ACCENT } from "@/lib/colorTags";
import { SECTION_ACCENT } from "@/lib/sectionAccent";

export default function QuizLauncherPage() {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const router = useRouter();

  const { data: topicsData, isLoading: topicsLoading, isError: topicsError } = useCourseTopics(courseId);
  const topics = topicsData?.topics ?? [];
  const selectedCourse = courses?.find((c) => c.id === courseId);

  function chooseCourse(id: string) {
    setCourseId(id);
    setTopicId(null);
  }

  function backToCourses() {
    setCourseId(null);
    setTopicId(null);
  }

  function startSession() {
    if (!courseId || !topicId) return;
    router.push(`/quiz/${courseId}?concept=${topicId}`);
  }

  function startWeakestFirst() {
    if (!courseId) return;
    router.push(`/quiz/${courseId}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`text-2xl font-bold ${SECTION_ACCENT.quiz}`}>Start a quiz session</h1>
        <p className="mt-0.5 text-sm text-ink-muted">
          {courseId ? "Pick a topic and we'll build a session around it." : "Pick a course to see its topics."}
        </p>
      </div>

      {/* Step 1: course */}
      {!courseId && (
        <>
          {coursesLoading ? (
            <LoadingSpinner label="Loading courses…" />
          ) : courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {courses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => chooseCourse(c.id)}
                  className="card flex items-center gap-3 p-4 text-left transition hover:border-seq-500/40 hover:shadow-md hover:shadow-ink-primary/10"
                >
                  <span className={`h-8 w-1.5 shrink-0 rounded-full ${c.color_tag ? COLOR_TAG_ACCENT[c.color_tag] : "bg-ink-muted"}`} />
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink-primary">{c.name}</span>
                    <span className="text-xs text-ink-muted">{c.mastery_pct}% mastery</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted">Upload some materials first to start a quiz.</p>
          )}
        </>
      )}

      {/* Step 2: topic */}
      {courseId && (
        <div className="card flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <button onClick={backToCourses} className="flex items-center gap-1 text-sm text-ink-muted hover:text-ink-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Change course
            </button>
            <span className="text-sm font-medium text-ink-primary">{selectedCourse?.name}</span>
          </div>

          {topicsLoading && <LoadingSpinner label="Finding topics in your materials…" />}

          {topicsError && (
            <p className="text-sm text-status-critical">
              Couldn't extract topics from this course right now. Try again in a moment.
            </p>
          )}

          {!topicsLoading && !topicsError && topics.length === 0 && (
            <p className="text-sm text-ink-muted">
              No materials found for this course yet — upload some notes first, then come back to pick a topic.
            </p>
          )}

          {!topicsLoading && topics.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const active = t.id === topicId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTopicId(t.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                        active
                          ? "border-seq-600 bg-seq-600 text-white shadow-sm"
                          : "border-hairline bg-surface-page text-ink-secondary hover:border-seq-500/40 hover:text-seq-600"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-hairline pt-4">
                <button onClick={startSession} disabled={!topicId} className="btn-primary">
                  Start quiz on this topic
                </button>
                <button onClick={startWeakestFirst} className="text-sm text-ink-muted underline hover:text-ink-primary">
                  Not sure — start with my weakest topics instead
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
