import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Material } from "@/lib/types";

export function useUploadMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      courseId,
      moduleId,
    }: {
      file: File;
      courseId: string;
      moduleId?: string;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      const query = moduleId ? `course_id=${courseId}&module_id=${moduleId}` : `course_id=${courseId}`;
      return api.post<Material>(`/materials/upload?${query}`, formData);
    },
    onSuccess: (_data, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["materials", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
    },
  });
}

export function useMaterialsForCourse(courseId: string | null) {
  return useQuery({
    queryKey: ["materials", courseId],
    queryFn: () => api.get<Material[]>(`/materials?course_id=${courseId}`),
    enabled: !!courseId,
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
