import { useQuery } from "@tanstack/react-query";

import { getDashboardStatistics } from "@/services/dashboardService";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStatistics,
  });
};