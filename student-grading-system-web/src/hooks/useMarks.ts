import { useQuery } from "@tanstack/react-query";
import { getMarks } from "@/services/marksService";

export const useMarks = (
  subjectId: number,
  assessmentType: string
) =>
  useQuery({
    queryKey: [
      "marks",
      subjectId,
      assessmentType,
    ],

    queryFn: () =>
      getMarks(
        subjectId,
        assessmentType
      ),
  });