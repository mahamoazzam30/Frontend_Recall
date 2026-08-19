"use client";

import { useState } from "react";

import { CourseCard } from "@/components/courses/CourseCard";
import { CreateCourseModal } from "@/components/courses/CreateCourseModal";
import { JoinCourseForm } from "@/components/courses/JoinCourseForm";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useCourses, useCreateCourse } from "@/hooks/useCourses";
import { SECTION_ACCENT } from "@/lib/sectionAccent";
import { ColorTag } from "@/lib/types";

export default function CoursesPage() {
  const { data: courses, isLoading } = useCourses();
  const createCourse = useCreateCourse();
  const [showModal, setShowModal] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  async function handleCreate(name: string, colorTag: ColorTag) {
    await createCourse.mutateAsync({ name, colorTag });
    setShowModal(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${SECTION_ACCENT.courses}`}>Courses</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowJoin((v) => !v)} className="btn-secondary">
            Join a course
          </button>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            New course
          </button>
        </div>
      </div>

      {showJoin && <JoinCourseForm onDone={() => setShowJoin(false)} />}

      {isLoading ? (
        <LoadingSpinner label="Loading courses…" />
      ) : courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-muted">
          No courses yet — create one to start uploading materials and tracking mastery.
        </p>
      )}

      {showModal && (
        <CreateCourseModal
          onCreate={handleCreate}
          onClose={() => setShowModal(false)}
          isCreating={createCourse.isPending}
        />
      )}
    </div>
  );
}
