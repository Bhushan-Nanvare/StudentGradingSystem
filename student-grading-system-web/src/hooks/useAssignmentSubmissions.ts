import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "@/services/assignmentSubmissionService";

export const useAssignmentSubmissions = (
  assignmentId: number
) =>
  useQuery({
    queryKey: ["assignment-submissions", assignmentId],
    queryFn: () => getSubmissions(assignmentId),
    enabled: assignmentId > 0,
  });