import api from "@/lib/axios";
import type { MarkAttendanceRequest } from "@/types/attendance";

export const markAttendance = async (
  data: MarkAttendanceRequest
) => {
  const res = await api.post("/attendance", data);
  return res.data;
};

export const getAttendance = async (
  subjectId: number
) => {
  const res = await api.get(`/attendance/${subjectId}`);
  return res.data;
};