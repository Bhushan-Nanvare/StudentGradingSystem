import { useMemo, useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import DataTable, { type Column } from "@/components/common/DataTable";
import ErrorCard from "@/components/common/ErrorCard";
import { Button } from "@/components/ui/button";
import {
  useAttendanceReports,
  useDepartmentReports,
  useFacultyReports,
  useMarksReports,
  useSubjectReports,
} from "@/hooks/useReports";
import type {
  AttendanceReport,
  DepartmentReport,
  FacultyReport,
  MarksReport,
  SubjectReport,
} from "@/types/report";

type ReportType =
  | "faculty"
  | "departments"
  | "attendance"
  | "marks"
  | "subjects";

const reportTabs: { key: ReportType; label: string }[] = [
  { key: "faculty", label: "Faculty" },
  { key: "departments", label: "Departments" },
  { key: "attendance", label: "Attendance" },
  { key: "marks", label: "Marks" },
  { key: "subjects", label: "Subjects" },
];

const facultyColumns: Column<FacultyReport>[] = [
  { key: "employeeCode", header: "Code", sortable: true },
  { key: "facultyName", header: "Name", sortable: true },
  { key: "departmentName", header: "Department", sortable: true },
  { key: "designation", header: "Designation", sortable: true },
  {
    key: "assignedSubjectsCount",
    header: "Subjects",
    sortable: true,
  },
  {
    key: "totalStudentsTaught",
    header: "Students Taught",
    sortable: true,
  },
];

const departmentColumns: Column<DepartmentReport>[] = [
  { key: "departmentName", header: "Department", sortable: true },
  { key: "facultyCount", header: "Faculty", sortable: true },
  { key: "studentCount", header: "Students", sortable: true },
  { key: "subjectCount", header: "Subjects", sortable: true },
  {
    key: "averageCGPA",
    header: "Avg CGPA",
    sortable: true,
    render: (row) => row.averageCGPA.toFixed(2),
  },
];

const attendanceColumns: Column<AttendanceReport>[] = [
  { key: "subjectCode", header: "Code", sortable: true },
  { key: "subjectName", header: "Subject", sortable: true },
  {
    key: "totalClassesConducted",
    header: "Classes",
    sortable: true,
  },
  {
    key: "totalPresentRecords",
    header: "Present",
    sortable: true,
  },
  {
    key: "totalAbsentRecords",
    header: "Absent",
    sortable: true,
  },
  {
    key: "averageAttendancePercentage",
    header: "Avg Attendance",
    sortable: true,
    render: (row) => `${row.averageAttendancePercentage.toFixed(1)}%`,
  },
];

const marksColumns: Column<MarksReport>[] = [
  { key: "subjectName", header: "Subject", sortable: true },
  { key: "assessmentType", header: "Assessment", sortable: true },
  { key: "studentsGraded", header: "Graded", sortable: true },
  {
    key: "averageMarks",
    header: "Average",
    sortable: true,
    render: (row) => row.averageMarks.toFixed(1),
  },
  {
    key: "highestMarks",
    header: "Highest",
    sortable: true,
    render: (row) => row.highestMarks.toFixed(1),
  },
  {
    key: "lowestMarks",
    header: "Lowest",
    sortable: true,
    render: (row) => row.lowestMarks.toFixed(1),
  },
];

const subjectColumns: Column<SubjectReport>[] = [
  { key: "subjectCode", header: "Code", sortable: true },
  { key: "subjectName", header: "Subject", sortable: true },
  { key: "departmentName", header: "Department", sortable: true },
  { key: "facultyName", header: "Faculty", sortable: true },
  {
    key: "enrolledStudentsCount",
    header: "Enrolled",
    sortable: true,
  },
  { key: "credits", header: "Credits", sortable: true },
  { key: "semester", header: "Semester", sortable: true },
  {
    key: "averageMarks",
    header: "Avg Marks",
    sortable: true,
    render: (row) => row.averageMarks.toFixed(1),
  },
];

function filterBySearch<T>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return items;

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? "")
        .toLowerCase()
        .includes(query)
    )
  );
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState<ReportType>("faculty");

  const facultyQuery = useFacultyReports();
  const departmentQuery = useDepartmentReports();
  const attendanceQuery = useAttendanceReports();
  const marksQuery = useMarksReports();
  const subjectQuery = useSubjectReports();

  const activeQuery = {
    faculty: facultyQuery,
    departments: departmentQuery,
    attendance: attendanceQuery,
    marks: marksQuery,
    subjects: subjectQuery,
  }[reportType];

  const filteredFaculty = useMemo(
    () =>
      filterBySearch(facultyQuery.data ?? [], searchTerm, [
        "employeeCode",
        "facultyName",
        "departmentName",
        "designation",
      ]),
    [facultyQuery.data, searchTerm]
  );

  const filteredDepartments = useMemo(
    () =>
      filterBySearch(departmentQuery.data ?? [], searchTerm, ["departmentName"]),
    [departmentQuery.data, searchTerm]
  );

  const filteredAttendance = useMemo(
    () =>
      filterBySearch(attendanceQuery.data ?? [], searchTerm, [
        "subjectCode",
        "subjectName",
      ]),
    [attendanceQuery.data, searchTerm]
  );

  const filteredMarks = useMemo(
    () =>
      filterBySearch(marksQuery.data ?? [], searchTerm, [
        "subjectName",
        "assessmentType",
      ]),
    [marksQuery.data, searchTerm]
  );

  const filteredSubjects = useMemo(
    () =>
      filterBySearch(subjectQuery.data ?? [], searchTerm, [
        "subjectCode",
        "subjectName",
        "departmentName",
        "facultyName",
      ]),
    [subjectQuery.data, searchTerm]
  );

  if (activeQuery.isError) {
    return <ErrorCard onRetry={() => activeQuery.refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">System Reports</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {reportTabs.map((tab) => (
            <Button
              key={tab.key}
              variant={reportType === tab.key ? "default" : "outline"}
              onClick={() => setReportType(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Search ${reportType}...`}
        />
      </div>

      {reportType === "faculty" && (
        <DataTable
          data={filteredFaculty}
          columns={facultyColumns}
          keyExtractor={(row) => row.facultyId}
          isLoading={facultyQuery.isLoading}
        />
      )}

      {reportType === "departments" && (
        <DataTable
          data={filteredDepartments}
          columns={departmentColumns}
          keyExtractor={(row) => row.departmentId}
          isLoading={departmentQuery.isLoading}
        />
      )}

      {reportType === "attendance" && (
        <DataTable
          data={filteredAttendance}
          columns={attendanceColumns}
          keyExtractor={(row) => row.subjectId}
          isLoading={attendanceQuery.isLoading}
        />
      )}

      {reportType === "marks" && (
        <DataTable
          data={filteredMarks}
          columns={marksColumns}
          keyExtractor={(row) =>
            `${row.subjectId}-${row.assessmentType}`
          }
          isLoading={marksQuery.isLoading}
        />
      )}

      {reportType === "subjects" && (
        <DataTable
          data={filteredSubjects}
          columns={subjectColumns}
          keyExtractor={(row) => row.subjectId}
          isLoading={subjectQuery.isLoading}
        />
      )}
    </div>
  );
}
