import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "@/services/attendanceService";

export const useAttendance = (
  subjectId: number
) =>
  useQuery({
    queryKey: ["attendance", subjectId],
    queryFn: () => getAttendance(subjectId),
  });