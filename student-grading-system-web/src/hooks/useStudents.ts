import { useQuery } from "@tanstack/react-query";
import { getStudents, type StudentQueryParams } from "@/services/studentService";

export const useStudents = (params?: StudentQueryParams) => {
  return useQuery({
    queryKey: ["students", params ?? {}],
    queryFn: () => getStudents(params),
  });
};