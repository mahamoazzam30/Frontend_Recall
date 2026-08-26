import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { QuizSession, WeakSpot } from "@/lib/types";

export function useWeakSpots(courseId: string | null) {
  return useQuery({
    queryKey: ["weak-spots", courseId],
    queryFn: () => api.get<WeakSpot[]>(`/courses/${courseId}/weak-spots`),
    enabled: !!courseId,
  });
}

export function usePracticeWeakSpots(courseId: string) {
  return useMutation({
    mutationFn: () => api.post<QuizSession>(`/courses/${courseId}/weak-spots/practice`),
  });
}
