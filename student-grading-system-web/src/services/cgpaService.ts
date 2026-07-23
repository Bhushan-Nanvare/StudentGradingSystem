import api from "@/lib/axios";
import type { StudentCgpaSummary } from "@/types/cgpa";

export const getStudentCgpa = async (studentId: number): Promise<StudentCgpaSummary> => {
  const response = await api.get(`/cgpa/student/${studentId}`);
  return response.data;
};

export const recalculateStudentCgpa = async (studentId: number): Promise<StudentCgpaSummary> => {
  const response = await api.post(`/cgpa/student/${studentId}/recalculate`);
  return response.data;
};
