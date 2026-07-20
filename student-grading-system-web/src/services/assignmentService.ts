import api from "@/lib/axios";

import type {
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from "@/types/assignment";

export const getAssignments = async (
  subjectId: number
): Promise<Assignment[]> => {
  const res = await api.get(
    `/assignments/subject/${subjectId}`
  );

  return res.data;
};

export const createAssignment = async (
  data: CreateAssignmentRequest
) => {
  const res = await api.post(
    "/assignments",
    data
  );

  return res.data;
};

export const updateAssignment = async (
  id: number,
  data: UpdateAssignmentRequest
) => {
  const res = await api.put(
    `/assignments/${id}`,
    data
  );

  return res.data;
};

export const deleteAssignment = async (
  id: number
) => {
  const res = await api.delete(
    `/assignments/${id}`
  );

  return res.data;
};