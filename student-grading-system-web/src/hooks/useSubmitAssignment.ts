import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitAssignment } from "@/services/assignmentSubmissionService";

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAssignment,
    onSuccess: () => {
      toast.success("Assignment submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["student-assignments"] });
    },
    onError: () => {
      toast.error("Failed to submit assignment.");
    },
  });
};
