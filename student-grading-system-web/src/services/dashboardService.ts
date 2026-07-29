import api from "@/lib/axios";
import type { DashboardStats } from "@/types/dashboard";

export const getDashboardStatistics = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard");
  return response.data.data;
};
