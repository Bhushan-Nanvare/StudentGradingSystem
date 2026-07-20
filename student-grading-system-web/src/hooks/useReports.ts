import { useQuery } from "@tanstack/react-query";
import { getReport } from "@/services/reportService";

export const useReports = (subjectId: number) =>
  useQuery({
    queryKey: ["report", subjectId],
    queryFn: () => getReport(subjectId),
  });