import api from "@/lib/axios";
import type { Student } from "@/types/student";

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get("/students");
  return response.data.data;
};

export const getStudentById = async (
  id: number
): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data.data;
};

export const createStudent = async (
  student: Omit<Student, "id" | "department">
): Promise<Student> => {
  const response = await api.post("/students", student);
  return response.data.data;
};

export const updateStudent = async (
  id: number,
  student: Omit<Student, "id" | "department">
): Promise<Student> => {
  const response = await api.put(`/students/${id}`, student);
  return response.data.data;
};

export const deleteStudent = async (
  id: number
): Promise<void> => {
  await api.delete(`/students/${id}`);
};