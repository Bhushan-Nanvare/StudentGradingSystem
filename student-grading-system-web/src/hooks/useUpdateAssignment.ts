import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateAssignment } from "@/services/assignmentService";

export function useUpdateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: any;
    }) => updateAssignment(id, data),

    onSuccess: () => {
      toast.success("Assignment updated.");

      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });
    },

    onError: () => {
      toast.error("Failed to update assignment.");
    },
  });
}