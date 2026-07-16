import axios from "axios";
import type {
  FacultyAssignment,
  AssignSubjectRequest,
} from "@/types/facultyAssignment";

const api = axios.create({
  baseURL: "http://localhost:5095/api",
});

export const getAssignments = async (): Promise<FacultyAssignment[]> => {
  const response = await api.get("/faculty-assignment");
  return response.data.data;
};

export const assignSubject = async (
  data: AssignSubjectRequest
) => {
  const response = await api.post(
    "/faculty-assignment",
    data
  );

  return response.data.data;
};

export const deleteAssignment = async (id: number) => {
  await api.delete(`/faculty-assignment/${id}`);
};