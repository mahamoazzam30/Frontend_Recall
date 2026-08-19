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
    <div className="flex flex-col gap-6">
      <h1 className={`text-2xl font-bold ${SECTION_ACCENT.upload}`}>Upload materials</h1>

      <section className="card flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <StepBadge n={1} />
          <h2 className="font-semibold text-ink-primary">Choose a course</h2>
        </div>

        {coursesLoading ? (
          <LoadingSpinner label="Loading courses…" />
        ) : courses && courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {courses.map((c) => {
                const active = c.id === selectedCourseId;
                return (
                  <button
                    key={c.id}
                    onClick={() => chooseCourse(c.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-seq-500 bg-seq-100/40 shadow-sm"
                        : "border-ink-primary/10 bg-surface-card hover:border-seq-500/40"
                    }`}
                  >
                    <span className={`h-7 w-1.5 shrink-0 rounded-full ${c.color_tag ? COLOR_TAG_ACCENT[c.color_tag] : "bg-ink-muted"}`} />
                    <span className="min-w-0 truncate font-medium text-ink-primary">{c.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedCourse && courseDetail && courseDetail.modules.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3">
                <span className="text-xs font-medium text-ink-muted">Module:</span>
                <button
                  onClick={() => setSelectedModuleId("")}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    selectedModuleId === ""
                      ? "border-seq-600 bg-seq-600 text-white"
                      : "border-hairline text-ink-secondary hover:border-seq-500/40"
                  }`}
                >
                  No module
                </button>
                {courseDetail.modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      selectedModuleId === m.id
                        ? "border-seq-600 bg-seq-600 text-white"
                        : "border-hairline text-ink-secondary hover:border-seq-500/40"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-ink-muted">
            No courses yet — create one from the{" "}
            <a href="/courses" className="text-seq-600 underline">
              Courses page
            </a>{" "}
            first.
          </p>
        )}
      </section>

      <section className="card flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <StepBadge n={2} />
          <h2 className="font-semibold text-ink-primary">Add your files</h2>
        </div>
        {selectedCourseId ? (
          <>
            <FileDropzone onFilesSelected={handleFilesSelected} disabled={!!progress} />
            {progress && (
              <p className="text-center text-xs text-ink-muted">
                Uploading {progress.current} of {progress.total}…
              </p>
            )}
          </>
        ) : (
          <p className="rounded-xl border border-dashed border-ink-primary/15 p-6 text-center text-sm text-ink-muted">
            Pick a course above before uploading.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <StepBadge n={3} />
          <h2 className="font-semibold text-ink-primary">Your materials</h2>
        </div>
        {selectedCourseId ? (
          <MaterialStatusList materials={materials ?? []} />
        ) : (
          <p className="text-sm text-ink-muted">Pick a course to see its materials.</p>
        )}
      </section>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-seq-600 text-[11px] font-bold text-white">
      {n}
    </span>
  );
}
