import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Attempt, Contest, QuizSession } from "@/lib/types";

export function useQuizSession(subjectId: string | null) {
  return useQuery({
    queryKey: ["quiz-session", subjectId],
    queryFn: () => api.get<QuizSession>(`/quiz/session/next?subject_id=${subjectId}`),
    enabled: !!subjectId,
    staleTime: Infinity,
  });
}

export function useSubmitAttempt() {
  return useMutation({
    mutationFn: (payload: { question_id: string; student_answer: string }) =>
      api.post<Attempt>("/quiz/attempts", payload),
  });
}

export function useContestGrade(attemptId: string) {
  return useMutation({
    mutationFn: (studentNote: string) =>
      api.post<Contest>(`/quiz/attempts/${attemptId}/contest`, { student_note: studentNote }),
  });
}
