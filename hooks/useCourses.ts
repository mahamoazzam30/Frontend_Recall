import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { ColorTag, CourseDashboard, CourseDetail, CourseListItem, Module } from "@/lib/types";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get<CourseListItem[]>("/courses"),
  });
}

export function useCourse(courseId: string | null) {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => api.get<CourseDetail>(`/courses/${courseId}`),
    enabled: !!courseId,
  });
}

export function useCourseDashboard(courseId: string | null) {
  return useQuery({
    queryKey: ["courses", courseId, "dashboard"],
    queryFn: () => api.get<CourseDashboard>(`/courses/${courseId}/dashboard`),
    enabled: !!courseId,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, colorTag }: { name: string; colorTag: ColorTag }) =>
      api.post<CourseDetail["course"]>("/courses", { name, color_tag: colorTag }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useCreateModule(courseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.post<Module>(`/courses/${courseId}/modules`, { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses", courseId] }),
  });
}
