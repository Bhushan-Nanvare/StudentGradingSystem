import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject } from "@/services/subjectService";

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
};