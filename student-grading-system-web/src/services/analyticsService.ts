import api from "@/lib/axios";
import type {
  DepartmentAnalytics,
  OverallAnalytics,
  SubjectAnalytics,
} from "@/types/analytics";

export const getOverallAnalytics = async (): Promise<OverallAnalytics> => {
  const response = await api.get("/analytics/overall");
  return response.data;
};

export const getDepartmentAnalytics = async (): Promise<DepartmentAnalytics[]> => {
  const response = await api.get("/analytics/departments");
  return response.data;
};

export const getSubjectAnalytics = async (): Promise<SubjectAnalytics[]> => {
  const response = await api.get("/analytics/subjects");
  return response.data;
};
