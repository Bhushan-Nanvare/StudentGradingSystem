import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "@/services/assignmentService";

export function useAssignments(subjectId: number) {
  return useQuery({
    queryKey: ["assignments", subjectId],
    queryFn: () => getAssignments(subjectId),
  });
}