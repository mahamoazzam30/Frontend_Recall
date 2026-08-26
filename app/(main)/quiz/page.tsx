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
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className={`text-4xl font-black text-ink-primary ${SECTION_ACCENT.quiz}`}>Start a quiz session</h1>
        <p className="text-ink-secondary mt-2 text-lg">
          {courseId ? "Pick a topic and we'll build a session around it." : "Pick a course to see its topics."}
        </p>
      </div>

      {/* Step 1: course */}
      {!courseId && (
        <>
          {coursesLoading ? (
            <LoadingSpinner label="Loading courses…" />
          ) : courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => chooseCourse(c.id)}
                  className="card-elevated flex items-center gap-4 p-5 text-left transition-all hover:shadow-strong hover:-translate-y-1"
                >
                  <span className={`h-10 w-1.5 shrink-0 rounded-full ${c.color_tag ? COLOR_TAG_ACCENT[c.color_tag] : "bg-ink-muted"}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-ink-primary text-lg">{c.name}</span>
                    <span className="text-sm text-ink-secondary">{Math.round(c.mastery_pct)}% mastery</span>
                  </span>
                  <svg className="w-5 h-5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            <div className="card-elevated p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ink-primary mb-2">No materials yet</h3>
              <p className="text-ink-secondary mb-6 max-w-md mx-auto">
                Upload some course materials first to start generating personalized quizzes.
              </p>
              <a href="/upload" className="btn-primary inline-block">
                Upload materials
              </a>
            </div>
          )}
        </>
      )}

      {/* Step 2: topic */}
      {courseId && (
        <div className="card-elevated p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={backToCourses} 
              className="flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-brand-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Change course
            </button>
            <span className="text-lg font-semibold text-ink-primary">{selectedCourse?.name}</span>
          </div>

          {topicsLoading && <LoadingSpinner label="Finding topics in your materials…" />}

          {topicsError && (
            <div className="p-4 rounded-lg bg-accent-rose-50 border border-accent-rose-200">
              <p className="text-sm text-accent-rose-700">
                Couldn't extract topics from this course right now. Try again in a moment.
              </p>
            </div>
          )}

          {!topicsLoading && !topicsError && topics.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-ink-secondary">
                No materials found for this course yet — upload some notes first, then come back to pick a topic.
              </p>
            </div>
          )}

          {!topicsLoading && topics.length > 0 && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                {topics.map((t) => {
                  const active = t.id === topicId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTopicId(t.id)}
                      className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all ${
                        active
                          ? "border-brand-600 bg-brand-600 text-white shadow-medium"
                          : "border-border-light bg-surface-card text-ink-secondary hover:border-brand-300 hover:text-brand-600 hover:shadow-soft"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border-light">
                <button 
                  onClick={startSession} 
                  disabled={!topicId} 
                  className="btn-primary flex-1 sm:flex-none py-3"
                >
                  Start quiz on this topic
                </button>
                <button 
                  onClick={startWeakestFirst} 
                  className="btn-ghost flex-1 sm:flex-none"
                >
                  Start with weakest topics
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
