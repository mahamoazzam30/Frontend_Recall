import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Material, Subject } from "@/lib/types";

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: () => api.get<Subject[]>("/subjects"),
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.post<Subject>("/subjects", { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useUploadMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, subjectId }: { file: File; subjectId: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post<Material>(`/materials/upload?subject_id=${subjectId}`, formData);
    },
    onSuccess: (_data, { subjectId }) =>
      queryClient.invalidateQueries({ queryKey: ["materials", subjectId] }),
  });
}

export function useMaterialsForSubject(subjectId: string | null) {
  return useQuery({
    queryKey: ["materials", subjectId],
    queryFn: () => api.get<Material[]>(`/materials?subject_id=${subjectId}`),
    enabled: !!subjectId,
    refetchInterval: (query) => {
      const materials = query.state.data;
      const stillProcessing = materials?.some((m) => m.status === "processing");
      return stillProcessing ? 2000 : false;
    },
  });
}

export function useMaterialStatus(materialId: string | null) {
  return useQuery({
    queryKey: ["material-status", materialId],
    queryFn: () => api.get<{ id: string; status: Material["status"] }>(`/materials/${materialId}/status`),
    enabled: !!materialId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "processing" ? 2000 : false;
    },
  });
}
