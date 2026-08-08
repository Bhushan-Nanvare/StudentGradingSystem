import { useParams } from "react-router-dom";
import { useReports } from "@/hooks/useReports";
import DataTable, { type Column } from "@/components/common/DataTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";

type StudentReport = {
  studentId: number;
  studentName: string;
  attendancePercentage: number;
  cia1: number;
  cia2: number;
  assignment: number;
  total: number;
};

const columns: Column<StudentReport>[] = [
  { key: "studentName", header: "Student", sortable: true },
  {
    key: "attendancePercentage",
    header: "Attendance",
    sortable: true,
    render: (row) => {
      const pct = row.attendancePercentage;
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <span className={`text-xs font-medium ${
            pct >= 75 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-red-600"
          }`}>
            {pct.toFixed(1)}%
          </span>
        </div>
      );
    },
  },
  {
    key: "cia1",
    header: "CIA 1",
    sortable: true,
    render: (row) => <span className="font-medium">{row.cia1}</span>,
  },
  {
    key: "cia2",
    header: "CIA 2",
    sortable: true,
    render: (row) => <span className="font-medium">{row.cia2}</span>,
  },
  {
    key: "assignment",
    header: "Assignment",
    sortable: true,
    render: (row) => <span className="font-medium">{row.assignment}</span>,
  },
  {
    key: "total",
    header: "Total",
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {row.total}
      </span>
    ),
  },
];

export default function ReportsTab() {
  const { subjectId } = useParams();
  const { data: reports, isLoading, isError, refetch } = useReports(Number(subjectId));

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorCard onRetry={refetch} />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Subject Report</h2>
        <p className="text-sm text-slate-500">
          Consolidated view of attendance, CIA marks, and assignments for all students
        </p>
      </div>

      <DataTable
        data={(reports as StudentReport[] | undefined) ?? []}
        columns={columns}
        keyExtractor={(row) => row.studentId}
        isLoading={isLoading}
      />
    </div>
  );
}