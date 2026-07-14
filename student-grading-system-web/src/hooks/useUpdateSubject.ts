import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubject } from "@/services/subjectService";

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      subject,
    }: {
      id: number;
      subject: {
        subjectCode: string;
        name: string;
        credits: number;
        semester: number;
        departmentId: number;
        facultyId: number;
      };
    }) => updateSubject(id, subject),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
};