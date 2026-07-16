import { useQuery } from "@tanstack/react-query";
import { getStudentsBySubject } from "@/services/teacherService";

export function useMyStudents(subjectId: number) {
  return useQuery({
    queryKey: ["teacher-students", subjectId],
    queryFn: () => getStudentsBySubject(subjectId),
    enabled: !!subjectId,
  });
}