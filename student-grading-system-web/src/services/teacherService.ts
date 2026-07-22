import api from "@/lib/axios";
import type { TeacherSubject } from "@/types/teacher";

export async function getMySubjects(): Promise<TeacherSubject[]> {
  const response = await api.get("/faculty-portal/subjects");

  return response.data;
}

export async function getStudentsBySubject(
  subjectId: number
) {
  const response = await api.get(
    `/faculty-portal/subjects/${subjectId}/students`
  );

  return response.data;
}


