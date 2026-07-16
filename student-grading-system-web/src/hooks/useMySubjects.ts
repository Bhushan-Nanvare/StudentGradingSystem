import { useQuery } from "@tanstack/react-query";
import { getMySubjects } from "@/services/teacherService";

export function useMySubjects() {
  return useQuery({
    queryKey: ["teacher-subjects"],
    queryFn: getMySubjects,
  });
}