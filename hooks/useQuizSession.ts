import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Attempt, Contest, QuizSession } from "@/lib/types";

export function useQuizSession(courseId: string | null, conceptIds?: string[]) {
  const conceptQuery = conceptIds?.length
    ? conceptIds.map((id) => `concept_ids=${id}`).join("&")
    : "";

  return useQuery({
    queryKey: ["quiz-session", courseId, conceptIds ?? null],
    queryFn: () =>
      api.get<QuizSession>(
        `/quiz/session/next?course_id=${courseId}${conceptQuery ? `&${conceptQuery}` : ""}`
      ),
    enabled: !!courseId,
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
