import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { FlashcardReview, FlashcardSession, RecallRating } from "@/lib/types";

export function useFlashcardSession(courseId: string | null, conceptIds?: string[]) {
  const conceptQuery = conceptIds?.length
    ? conceptIds.map((id) => `concept_ids=${id}`).join("&")
    : "";

  return useQuery({
    queryKey: ["flashcard-session", courseId, conceptIds ?? null],
    queryFn: () =>
      api.get<FlashcardSession>(
        `/courses/${courseId}/flashcards/next${conceptQuery ? `?${conceptQuery}` : ""}`
      ),
    enabled: !!courseId,
    staleTime: Infinity,
  });
}

export function useReviewFlashcard(courseId: string | null) {
  return useMutation({
    mutationFn: (payload: { question_id: string; recall: RecallRating }) =>
      api.post<FlashcardReview>(`/courses/${courseId}/flashcards/review`, payload),
  });
}
