import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "@/services/studentService";

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      student,
    }: {
      id: number;
      student: {
        name: string;
        age: number;
        cgpa: number;
        departmentId: number;
      };
    }) => updateStudent(id, student),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
};