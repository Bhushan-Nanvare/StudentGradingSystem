import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "@/services/assignmentService";
import { getMySubjects } from "@/services/teacherService";
import type { Assignment } from "@/types/assignment";

export interface FacultyAssignment extends Assignment {
  subjectId: number;
  subjectCode: string;
}

export const useFacultyRecentAssignments = () =>
  useQuery({
    queryKey: ["faculty-recent-assignments"],
    queryFn: async (): Promise<FacultyAssignment[]> => {
      const subjects = await getMySubjects();

      const results = await Promise.all(
        subjects.map(async (subject) => {
          const assignments = await getAssignments(subject.id);
          return assignments.map((assignment) => ({
            ...assignment,
            subjectId: subject.id,
            subjectCode: subject.subjectCode,
          }));
        })
      );

      return results
        .flat()
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
    },
  });
