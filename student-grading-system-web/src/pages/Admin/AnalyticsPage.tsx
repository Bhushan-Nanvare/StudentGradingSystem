import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  useDepartmentAnalytics,
  useOverallAnalytics,
  useSubjectAnalytics,
} from "@/hooks/useAnalytics";
import StatsCard from "@/components/common/StatsCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import DataTable, { type Column } from "@/components/common/DataTable";
import {
  GraduationCap,
  Percent,
  ArrowUp,
  ArrowDown,
  Users,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import type {
  DepartmentAnalytics,
  SubjectAnalytics,
} from "@/types/analytics";

const departmentColumns: Column<DepartmentAnalytics>[] = [
  { key: "departmentName", header: "Department", sortable: true },
  { key: "totalStudents", header: "Students", sortable: true },
  {
    key: "averageCGPA",
    header: "Avg CGPA",
    sortable: true,
    render: (row) => row.averageCGPA.toFixed(2),
  },
  {
    key: "attendancePercentage",
    header: "Attendance",
    sortable: true,
    render: (row) => `${row.attendancePercentage.toFixed(1)}%`,
  },
  {
    key: "passPercentage",
    header: "Pass Rate",
    sortable: true,
    render: (row) => `${row.passPercentage.toFixed(1)}%`,
  },
];

const subjectColumns: Column<SubjectAnalytics>[] = [
  { key: "subjectCode", header: "Code", sortable: true },
  { key: "subjectName", header: "Subject", sortable: true },
  { key: "enrolledStudents", header: "Enrolled", sortable: true },
  {
    key: "averageMarks",
    header: "Avg Marks",
    sortable: true,
    render: (row) => row.averageMarks.toFixed(1),
  },
  {
    key: "attendancePercentage",
    header: "Attendance",
    sortable: true,
    render: (row) => `${row.attendancePercentage.toFixed(1)}%`,
  },
  {
    key: "passPercentage",
    header: "Pass Rate",
    sortable: true,
    render: (row) => `${row.passPercentage.toFixed(1)}%`,
  },
];

export default function AnalyticsPage() {
  const overallQuery = useOverallAnalytics();
  const departmentQuery = useDepartmentAnalytics();
  const subjectQuery = useSubjectAnalytics();

  if (overallQuery.isLoading) return <LoadingSpinner />;
  if (overallQuery.isError || !overallQuery.data) {
    return <ErrorCard onRetry={() => overallQuery.refetch()} />;
  }

  const data = overallQuery.data;

  const departmentChartData =
    departmentQuery.data?.map((dept) => ({
      name: dept.departmentName,
      attendance: Number(dept.attendancePercentage.toFixed(1)),
      passRate: Number(dept.passPercentage.toFixed(1)),
    })) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Overall Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={data.totalStudents}
          icon={Users}
        />
        <StatsCard
          title="Total Subjects"
          value={data.totalSubjects}
          icon={BookOpen}
        />
        <StatsCard
          title="Overall Attendance"
          value={`${data.overallAttendancePercentage.toFixed(1)}%`}
          icon={Percent}
        />
        <StatsCard
          title="Pass Percentage"
          value={`${data.passPercentage.toFixed(1)}%`}
          icon={CheckCircle}
        />
        <StatsCard
          title="Average Marks"
          value={data.averageMarks.toFixed(1)}
          icon={GraduationCap}
        />
        <StatsCard
          title="Highest Marks"
          value={data.highestMarks.toFixed(1)}
          icon={ArrowUp}
        />
        <StatsCard
          title="Lowest Marks"
          value={data.lowestMarks.toFixed(1)}
          icon={ArrowDown}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Department Attendance & Pass Rate
        </h2>

        <div className="h-72">
          {departmentQuery.isLoading ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : departmentChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar
                  dataKey="attendance"
                  fill="#2563eb"
                  name="Attendance %"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="passRate"
                  fill="#16a34a"
                  name="Pass Rate %"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              No department analytics available.
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Department Analytics</h2>
        {departmentQuery.isError ? (
          <ErrorCard onRetry={() => departmentQuery.refetch()} />
        ) : (
          <DataTable
            data={departmentQuery.data ?? []}
            columns={departmentColumns}
            keyExtractor={(row) => row.departmentId}
            isLoading={departmentQuery.isLoading}
          />
        )}
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Subject Analytics</h2>
        {subjectQuery.isError ? (
          <ErrorCard onRetry={() => subjectQuery.refetch()} />
        ) : (
          <DataTable
            data={subjectQuery.data ?? []}
            columns={subjectColumns}
            keyExtractor={(row) => row.subjectId}
            isLoading={subjectQuery.isLoading}
          />
        )}
      </div>
    </div>
  );
}
