import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaculty } from "@/services/facultyService";

export const useDeleteFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaculty,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculties"],
      });
    },
  });
};