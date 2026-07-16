import api from "@/lib/axios";
import type {
  Attendance,
  MarkAttendanceRequest,
} from "@/types/attendance";

export async function markAttendance(
  data: MarkAttendanceRequest
) {
  await api.post("/attendance", data);
}

export async function getAttendance(
  subjectId: number,
  date: string
): Promise<Attendance[]> {
  const response = await api.get("/attendance", {
    params: {
      subjectId,
      date,
    },
  });

  return response.data;
}