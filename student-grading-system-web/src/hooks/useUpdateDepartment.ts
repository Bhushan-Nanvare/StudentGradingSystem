import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "@/services/departmentService";

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      department,
    }: {
      id: number;
      department: {
        name: string;
      };
    }) => updateDepartment(id, department),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
};