import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaculty } from "@/services/facultyService";

export const useUpdateFaculty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      faculty,
    }: {
      id: number;
      faculty: {
        employeeCode: string;
        firstName: string;
        lastName: string;
        email: string;
        designation: string;
        salary: number;
        joiningDate: string;
        departmentId: number;
      };
    }) => updateFaculty(id, faculty),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faculties"],
      });
    },
  });
};