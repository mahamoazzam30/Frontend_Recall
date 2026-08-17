import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Attempt, DueTodayEntry, HistoryPoint, MasteryEntry, Streak } from "@/lib/types";

export function useMastery() {
  return useQuery({ queryKey: ["dashboard", "mastery"], queryFn: () => api.get<MasteryEntry[]>("/dashboard/mastery") });
}

export function useDueToday() {
  return useQuery({
    queryKey: ["dashboard", "due-today"],
    queryFn: () => api.get<DueTodayEntry[]>("/dashboard/due-today"),
    refetchInterval: 60_000,
  });
}

export function useStreak() {
  return useQuery({ queryKey: ["dashboard", "streak"], queryFn: () => api.get<Streak>("/dashboard/streak") });
}

export function useHistory() {
  return useQuery({ queryKey: ["dashboard", "history"], queryFn: () => api.get<HistoryPoint[]>("/dashboard/history") });
}

export function useAttempt(attemptId: string) {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => api.get<Attempt>(`/quiz/attempts/${attemptId}`),
  });
}
