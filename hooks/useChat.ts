import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { ChatResponse } from "@/lib/types";

export function useAskQuestion(courseId: string) {
  return useMutation({
    mutationFn: (question: string) => api.post<ChatResponse>(`/courses/${courseId}/chat`, { question }),
  });
}
