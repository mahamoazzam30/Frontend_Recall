"use client";

import { useState } from "react";

import { FileDropzone } from "@/components/upload/FileDropzone";
import { MaterialStatusList } from "@/components/upload/MaterialStatusList";
import { useCourse, useCourses } from "@/hooks/useCourses";
import { useMaterialsForCourse, useUploadMaterial } from "@/hooks/useMaterials";

export default function UploadPage() {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const uploadMaterial = useUploadMaterial();

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const { data: courseDetail } = useCourse(selectedCourseId || null);
  const { data: materials } = useMaterialsForCourse(selectedCourseId || null);

  async function handleFilesSelected(files: File[]) {
    if (!selectedCourseId) return;
    for (const file of files) {
      await uploadMaterial.mutateAsync({
        file,
        courseId: selectedCourseId,
        moduleId: selectedModuleId || undefined,
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-ink-primary">Upload materials</h1>

      <section className="flex flex-col gap-2">
        <label className="text-sm font-medium text-ink-primary">Course</label>
        <div className="flex gap-2">
          <select
            className="input"
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setSelectedModuleId("");
            }}
            disabled={coursesLoading}
          >
            <option value="">Select a course…</option>
            {courses?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {courseDetail && courseDetail.modules.length > 0 && (
            <select className="input" value={selectedModuleId} onChange={(e) => setSelectedModuleId(e.target.value)}>
              <option value="">No module</option>
              {courseDetail.modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {!coursesLoading && (!courses || courses.length === 0) && (
          <p className="text-sm text-ink-muted">
            No courses yet — create one from the{" "}
            <a href="/courses" className="text-seq-600 underline">
              Courses page
            </a>{" "}
            first.
          </p>
        )}
      </section>

      <section>
        {selectedCourseId ? (
          <FileDropzone onFilesSelected={handleFilesSelected} />
        ) : (
          <p className="text-sm text-ink-muted">Select a course before uploading.</p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold text-ink-primary">Materials</h2>
        <MaterialStatusList materials={materials ?? []} />
      </section>
    </div>
  );
}
