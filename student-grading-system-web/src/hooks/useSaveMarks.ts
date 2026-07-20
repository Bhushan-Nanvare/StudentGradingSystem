import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { saveMarks } from "@/services/marksService";

export const useSaveMarks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveMarks,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "marks",
          variables.subjectId,
          variables.assessmentType,
        ],
      });

      toast.success(
        "Marks saved successfully."
      );
    },

    onError: () => {
      toast.error(
        "Failed to save marks."
      );
    },
  });
};