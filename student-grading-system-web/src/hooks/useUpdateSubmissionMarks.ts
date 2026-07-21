import { useMutation } from "@tanstack/react-query";
import { updateSubmissionMarks } from "@/services/assignmentSubmissionService";

export const useUpdateSubmissionMarks = () =>
  useMutation({
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
  });