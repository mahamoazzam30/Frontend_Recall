"use client";

import { useState } from "react";

import { FileDropzone } from "@/components/upload/FileDropzone";
import { MaterialStatusList } from "@/components/upload/MaterialStatusList";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useCourse, useCourses } from "@/hooks/useCourses";
import { useMaterialsForCourse, useUploadMaterial } from "@/hooks/useMaterials";
import { COLOR_TAG_ACCENT } from "@/lib/colorTags";
import { SECTION_ACCENT } from "@/lib/sectionAccent";

export default function UploadPage() {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const uploadMaterial = useUploadMaterial();

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const { data: courseDetail } = useCourse(selectedCourseId || null);
  const { data: materials } = useMaterialsForCourse(selectedCourseId || null);

  const selectedCourse = courses?.find((c) => c.id === selectedCourseId);

  function chooseCourse(id: string) {
    setSelectedCourseId(id);
    setSelectedModuleId("");
  }

  async function handleFilesSelected(files: File[]) {
    if (!selectedCourseId) return;
    setProgress({ current: 0, total: files.length });
    for (let i = 0; i < files.length; i++) {
      await uploadMaterial.mutateAsync({
        file: files[i],
        courseId: selectedCourseId,
        moduleId: selectedModuleId || undefined,
      });
      setProgress({ current: i + 1, total: files.length });
    }
    setProgress(null);
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className={`text-4xl font-black text-ink-primary ${SECTION_ACCENT.upload}`}>Upload materials</h1>
        <p className="text-ink-secondary mt-2 text-lg">Add course materials to generate personalized quizzes</p>
      </div>

      <section className="card-elevated p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={1} />
          <h2 className="text-2xl font-bold text-ink-primary">Choose a course</h2>
        </div>

        {coursesLoading ? (
          <LoadingSpinner label="Loading courses…" />
        ) : courses && courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {courses.map((c) => {
                const active = c.id === selectedCourseId;
                return (
                  <button
                    key={c.id}
                    onClick={() => chooseCourse(c.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      active
                        ? "border-brand-600 bg-brand-50 shadow-medium"
                        : "border-border-light bg-surface-card hover:border-brand-300 hover:shadow-soft"
                    }`}
                  >
                    <span className={`h-8 w-1.5 shrink-0 rounded-full ${c.color_tag ? COLOR_TAG_ACCENT[c.color_tag] : "bg-ink-muted"}`} />
                    <span className="min-w-0 truncate font-medium text-ink-primary">{c.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedCourse && courseDetail && courseDetail.modules.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-border-light pt-4 mt-4">
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Module:</span>
                <button
                  onClick={() => setSelectedModuleId("")}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                    selectedModuleId === ""
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-border-light text-ink-secondary hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  No module
                </button>
                {courseDetail.modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                      selectedModuleId === m.id
                        ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                        : "border-border-light text-ink-secondary hover:border-brand-300 hover:text-brand-600"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="card p-8 text-center">
            <p className="text-ink-secondary">
              No courses yet — create one from the{" "}
              <a href="/courses" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                Courses page
              </a>{" "}
              first.
            </p>
          </div>
        )}
      </section>

      <section className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={2} />
          <h2 className="text-2xl font-bold text-ink-primary">Add your files</h2>
        </div>
        {selectedCourseId ? (
          <>
            <FileDropzone onFilesSelected={handleFilesSelected} disabled={!!progress} />
            {progress && (
              <div className="mt-4 p-3 rounded-lg bg-brand-50 border border-brand-200">
                <p className="text-center text-sm font-medium text-brand-700">
                  Uploading {progress.current} of {progress.total}…
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-border-light p-8 text-center">
            <p className="text-ink-secondary">Pick a course above before uploading.</p>
          </div>
        )}
      </section>

      <section className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-6">
          <StepBadge n={3} />
          <h2 className="text-2xl font-bold text-ink-primary">Your materials</h2>
        </div>
        {selectedCourseId ? (
          <MaterialStatusList materials={materials ?? []} />
        ) : (
          <p className="text-ink-secondary">Pick a course to see its materials.</p>
        )}
      </section>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-sm">
      {n}
    </span>
  );
}
