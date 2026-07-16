import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "@/services/facultyAssignmentService";

export function useFacultyAssignments() {
  return useQuery({
    queryKey: ["facultyAssignments"],
    queryFn: getAssignments,
  });
}