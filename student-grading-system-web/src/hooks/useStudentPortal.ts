import { useQuery } from "@tanstack/react-query";
import * as api from "@/services/studentPortalApi";

export const useStudentDashboard = () =>
  useQuery({
    queryKey: ["student-dashboard"],
    queryFn: api.getDashboard,
  });

export const useStudentProfile = () =>
  useQuery({
    queryKey: ["student-profile"],
    queryFn: api.getProfile,
  });

export const useStudentSubjects = () =>
  useQuery({
    queryKey: ["student-subjects"],
    queryFn: api.getSubjects,
  });

export const useStudentAttendance = () =>
  useQuery({
    queryKey: ["student-attendance"],
    queryFn: api.getAttendance,
  });

export const useStudentMarks = () =>
  useQuery({
    queryKey: ["student-marks"],
    queryFn: api.getMarks,
  });

export const useStudentAssignments = () =>
  useQuery({
    queryKey: ["student-assignments"],
    queryFn: api.getAssignments,
  });