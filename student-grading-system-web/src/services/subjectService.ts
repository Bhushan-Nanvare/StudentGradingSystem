import api from "@/lib/axios";

import type {
  Subject,
  CreateSubjectRequest,
  UpdateSubjectRequest,
} from "@/types/subject";

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get("/subjects");

  return response.data.data;
};

export const getSubjectById = async (
  id: number
): Promise<Subject> => {
  const response = await api.get(`/subjects/${id}`);

  return response.data.data;
};

export const createSubject = async (
  subject: CreateSubjectRequest
): Promise<Subject> => {
  const response = await api.post(
    "/subjects",
    subject
  );

  return response.data.data;
};

export const updateSubject = async (
  id: number,
  subject: UpdateSubjectRequest
): Promise<Subject> => {
  const response = await api.put(
    `/subjects/${id}`,
    subject
  );

  return response.data.data;
};

export const deleteSubject = async (
  id: number
): Promise<void> => {
  await api.delete(`/subjects/${id}`);
};