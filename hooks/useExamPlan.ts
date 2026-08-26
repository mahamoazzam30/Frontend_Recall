import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { ExamPlan } from "@/lib/types";

export function useExamPlan(courseId: string | null) {
  return useQuery({
    queryKey: ["exam-plan", courseId],
    queryFn: () => api.get<ExamPlan>(`/courses/${courseId}/exam-plan`),
    enabled: !!courseId,
    retry: false,
  });
}

export function useCreateExamPlan(courseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (examDate: string) =>
      api.post<ExamPlan>(`/courses/${courseId}/exam-plan`, { exam_date: examDate }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exam-plan", courseId] }),
  });
}

export function useUpdateExamPlan(courseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { exam_date?: string; status?: ExamPlan["status"] }) =>
      api.patch<ExamPlan>(`/courses/${courseId}/exam-plan`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["exam-plan", courseId] }),
  });
}
