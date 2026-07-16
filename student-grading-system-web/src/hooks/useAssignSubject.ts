import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignSubject } from "@/services/facultyAssignmentService";

export function useAssignSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facultyAssignments"],
      });
    },
  });
}