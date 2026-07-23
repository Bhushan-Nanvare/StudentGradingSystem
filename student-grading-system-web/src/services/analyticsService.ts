import api from "@/lib/axios";
import type { OverallAnalytics } from "@/types/analytics";

export const getOverallAnalytics = async (): Promise<OverallAnalytics> => {
  const response = await api.get("/analytics/overall");
  return response.data;
};

// Assuming department and subject analytics return lists of similar shapes or specific shapes. 
// For now, returning any[] until types are strictly defined, or we map it to existing types.
export const getDepartmentAnalytics = async (): Promise<any[]> => {
  const response = await api.get("/analytics/departments");
  return response.data;
};

export const getSubjectAnalytics = async (): Promise<any[]> => {
  const response = await api.get("/analytics/subjects");
  return response.data;
};
