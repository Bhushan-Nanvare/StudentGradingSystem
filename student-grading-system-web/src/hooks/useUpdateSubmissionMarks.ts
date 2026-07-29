import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSubmissionMarks } from "@/services/assignmentSubmissionService";

export const useUpdateSubmissionMarks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      marks,
      remarks,
    }: {
      submissionId: number;
      marks: number;
      remarks: string;
    }) =>
      updateSubmissionMarks(submissionId, {
        marks,
        remarks,
      }),
    onSuccess: () => {
      toast.success("Marks updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["assignment-submissions"] });
    },
    onError: () => {
      toast.error("Failed to update marks.");
    },
  });
};
