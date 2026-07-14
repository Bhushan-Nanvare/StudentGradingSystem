import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubject } from "@/services/subjectService";

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
};