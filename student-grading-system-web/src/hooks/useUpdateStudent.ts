import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "@/services/studentService";
import type { UpdateStudentRequest } from "@/types/student";

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      student,
    }: {
      id: number;
      student: UpdateStudentRequest;
    }) => updateStudent(id, student),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};