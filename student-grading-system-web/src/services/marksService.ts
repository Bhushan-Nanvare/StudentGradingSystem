import api from "@/lib/axios";
import type {
  SaveMarksRequest,
  MarkResponse,
} from "@/types/marks";

export const getMarks = async (
  subjectId: number,
  assessmentType: string
): Promise<MarkResponse[]> => {
  const res = await api.get(
    `/marks/${subjectId}`,
    {
      params: {
        assessmentType,
      },
    }
  );

  return res.data;
};

export const saveMarks = async (
  data: SaveMarksRequest
) => {
  const res = await api.post(
    "/marks",
    data
  );

  return res.data;
};