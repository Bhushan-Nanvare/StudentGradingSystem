import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getStudentCgpa, recalculateStudentCgpa } from "@/services/cgpaService";

export const useStudentCgpa = (studentId: number) => {
  return useQuery({
    queryKey: ["cgpa", studentId],
    queryFn: () => getStudentCgpa(studentId),
    enabled: !!studentId,
  });
};

export const useRecalculateCgpa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recalculateStudentCgpa,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cgpa", variables] });
      toast.success("CGPA recalculated successfully.");
    },
    onError: () => {
      toast.error("Failed to recalculate CGPA.");
    },
  });
};
