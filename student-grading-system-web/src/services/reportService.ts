import axios from "@/lib/axios";
import type { StudentReport } from "@/types/report";


export const getReport = async (
  subjectId: number
): Promise<StudentReport[]> => {
  const { data } = await axios.get(
    `/reports/${subjectId}`
  );

  return data;
};