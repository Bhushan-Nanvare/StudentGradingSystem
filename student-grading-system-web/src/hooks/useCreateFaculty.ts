import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaculty } from "@/services/facultyService";

export const useCreateFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFaculty,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculties"],
      });
    },
  });
};