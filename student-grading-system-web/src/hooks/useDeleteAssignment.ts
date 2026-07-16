import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssignment } from "@/services/facultyAssignmentService";

export function useDeleteAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultyAssignments"],
      });
    },
  });
}