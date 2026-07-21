import { useMutation } from "@tanstack/react-query";
import { submitAssignment } from "@/services/assignmentSubmissionService";

export const useSubmitAssignment = () =>
  useMutation({
    mutationFn: submitAssignment,
  });