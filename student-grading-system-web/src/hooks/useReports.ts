import { useQuery } from "@tanstack/react-query";
import {
  getAttendanceReports,
  getDepartmentReports,
  getFacultyReports,
  getMarksReports,
  getReport,
  getSubjectReports,
} from "@/services/reportService";

export const useReports = (subjectId: number) =>
  useQuery({
    queryKey: ["report", subjectId],
    queryFn: () => getReport(subjectId),
    enabled: subjectId > 0,
  });

export const useFacultyReports = () =>
  useQuery({
    queryKey: ["reports", "faculty"],
    queryFn: getFacultyReports,
  });

export const useDepartmentReports = () =>
  useQuery({
    queryKey: ["reports", "departments"],
    queryFn: getDepartmentReports,
  });

export const useAttendanceReports = () =>
  useQuery({
    queryKey: ["reports", "attendance"],
    queryFn: getAttendanceReports,
  });

export const useMarksReports = () =>
  useQuery({
    queryKey: ["reports", "marks"],
    queryFn: getMarksReports,
  });

export const useSubjectReports = () =>
  useQuery({
    queryKey: ["reports", "subjects"],
    queryFn: getSubjectReports,
  });
