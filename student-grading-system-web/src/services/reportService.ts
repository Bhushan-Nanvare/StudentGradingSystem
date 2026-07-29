import api from "@/lib/axios";
import type {
  AttendanceReport,
  DepartmentReport,
  FacultyReport,
  MarksReport,
  StudentReport,
  SubjectReport,
} from "@/types/report";

export const getReport = async (
  subjectId: number
): Promise<StudentReport[]> => {
  const { data } = await api.get(`/reports/${subjectId}`);
  return data;
};

export const getFacultyReports = async (): Promise<FacultyReport[]> => {
  const { data } = await api.get("/reports/faculty");
  return data;
};

export const getDepartmentReports = async (): Promise<DepartmentReport[]> => {
  const { data } = await api.get("/reports/department");
  return data;
};

export const getAttendanceReports = async (): Promise<AttendanceReport[]> => {
  const { data } = await api.get("/reports/attendance");
  return data;
};

export const getMarksReports = async (): Promise<MarksReport[]> => {
  const { data } = await api.get("/reports/marks");
  return data;
};

export const getSubjectReports = async (): Promise<SubjectReport[]> => {
  const { data } = await api.get("/reports/subject");
  return data;
};
