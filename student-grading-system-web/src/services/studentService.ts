import api from "@/lib/axios";
import type { CreateStudentRequest, Student, UpdateStudentRequest } from "@/types/student";

export interface StudentQueryParams {
  name?: string;
  department?: string;
  sortBy?: string;
  descending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export const getStudents = async (params?: StudentQueryParams): Promise<Student[]> => {
  const response = await api.get("/students", {
    params: {
      ...(params?.name ? { name: params.name } : {}),
      ...(params?.department ? { department: params.department } : {}),
      ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
      ...(typeof params?.descending === "boolean" ? { descending: params.descending } : {}),
      ...(params?.pageNumber ? { pageNumber: params.pageNumber } : {}),
      ...(params?.pageSize ? { pageSize: params.pageSize } : {}),
    },
  });

  return (response.data?.data ?? []) as Student[];
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data.data as Student;
};

export const createStudent = async (student: CreateStudentRequest): Promise<Student> => {
  const response = await api.post("/students", student);
  return response.data.data as Student;
};

export const updateStudent = async (id: number, student: UpdateStudentRequest): Promise<Student> => {
  const response = await api.put(`/students/${id}`, student);
  return response.data.data as Student;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};