import api from "@/lib/axios";
import type { FacultyDashboardData } from "@/types/facultyPortal";

export const getFacultyDashboard = async (): Promise<FacultyDashboardData> => {
  const response = await api.get("/faculty-portal/dashboard");
  return response.data;
};
