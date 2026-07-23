import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "@/services/attendanceService";

export const useAttendance = (
  subjectId: number,
  date: string
) =>
  useQuery({
    queryKey: ["attendance", subjectId, date],
    queryFn: () => getAttendance(subjectId, date),
  });