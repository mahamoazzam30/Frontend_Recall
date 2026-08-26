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
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-black text-ink-primary ${SECTION_ACCENT.courses}`}>Courses</h1>
          <p className="text-ink-secondary mt-2 text-lg">Manage your courses and track your learning progress</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowJoin((v) => !v)} className="btn-secondary">
            Join a course
          </button>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            New course
          </button>
        </div>
      </div>

      {showJoin && (
        <div className="card-elevated p-6 animate-scale-in">
          <JoinCourseForm onDone={() => setShowJoin(false)} />
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner label="Loading courses…" />
      ) : courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-elevated p-16 text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-ink-primary mb-3">No courses yet</h3>
          <p className="text-ink-secondary mb-8 max-w-md mx-auto text-lg">
            Create your first course to start uploading materials and tracking your mastery progress.
          </p>
          <button onClick={() => setShowModal(true)} className="btn-primary mx-auto py-4 text-lg">
            Create your first course
          </button>
        </div>
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
