import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/services/subjectService";

export const useSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });
};