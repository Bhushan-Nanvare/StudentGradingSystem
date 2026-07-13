import { useQuery } from "@tanstack/react-query";
import { getFaculties } from "@/services/facultyService";

export const useFaculties = () => {
  return useQuery({
    queryKey: ["faculties"],
    queryFn: getFaculties,
  });
};