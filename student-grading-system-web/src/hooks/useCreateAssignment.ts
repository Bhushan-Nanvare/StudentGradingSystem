import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createAssignment } from "@/services/assignmentService";

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssignment,

    onSuccess: () => {
      toast.success("Assignment created.");

      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });
    },

    onError: () => {
      toast.error("Failed to create assignment.");
    },
  });
}