import { useMutation } from "@tanstack/react-query";
import { markAttendance } from "@/services/attendanceService";

export function useMarkAttendance() {
  return useMutation({
    mutationFn: markAttendance,
  });
}