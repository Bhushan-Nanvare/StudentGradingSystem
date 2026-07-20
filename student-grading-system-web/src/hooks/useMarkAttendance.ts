import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { markAttendance } from "@/services/attendanceService";

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAttendance,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attendance", variables.subjectId],
      });

      toast.success("Attendance saved successfully.");
    },

    onError: () => {
      toast.error("Failed to save attendance.");
    },
  });
};