import { useQuery } from "@tanstack/react-query";
import {
  getOverallAnalytics,
  getDepartmentAnalytics,
  getSubjectAnalytics,
} from "@/services/analyticsService";

export const useOverallAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "overall"],
    queryFn: getOverallAnalytics,
  });
};

export const useDepartmentAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "departments"],
    queryFn: getDepartmentAnalytics,
  });
};

export const useSubjectAnalytics = () => {
  return useQuery({
    queryKey: ["analytics", "subjects"],
    queryFn: getSubjectAnalytics,
  });
};
