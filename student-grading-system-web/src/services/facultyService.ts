import api from "@/lib/axios";

import type {
  Faculty,
  CreateFacultyRequest,
  UpdateFacultyRequest,
} from "@/types/faculty";

export const getFaculties = async (): Promise<Faculty[]> => {
  const response = await api.get("/faculties");

  return response.data.data;
};

export const getFacultyById = async (
  id: number
): Promise<Faculty> => {
  const response = await api.get(`/faculties/${id}`);

  return response.data.data;
};

export const createFaculty = async (
  faculty: CreateFacultyRequest
): Promise<Faculty> => {
  const response = await api.post(
    "/faculties",
    faculty
  );

  return response.data.data;
};

export const updateFaculty = async (
  id: number,
  faculty: UpdateFacultyRequest
): Promise<Faculty> => {
  const response = await api.put(
    `/faculties/${id}`,
    faculty
  );

  return response.data.data;
};

export const deleteFaculty = async (
  id: number
): Promise<void> => {
  await api.delete(`/faculties/${id}`);
};