import { useQuery } from "@tanstack/react-query";
import { getFacultyDashboard } from "@/services/facultyPortalService";

export const useFacultyDashboard = () => {
  return useQuery({
    queryKey: ["facultyDashboard"],
    queryFn: getFacultyDashboard,
  });
};
