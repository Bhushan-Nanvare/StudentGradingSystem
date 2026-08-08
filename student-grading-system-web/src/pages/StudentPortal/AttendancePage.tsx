import { useStudentAttendance } from "@/hooks/useStudentPortal";
import DataTable, { type Column } from "@/components/common/DataTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import type { StudentAttendance } from "@/types/studentPortal";

const columns: Column<StudentAttendance>[] = [
  { key: "subject", header: "Subject", sortable: true },
  {
    key: "totalClasses",
    header: "Total Classes",
    sortable: true,
    render: (row) => <span className="font-medium">{row.totalClasses}</span>,
  },
  {
    key: "presentClasses",
    header: "Present",
    sortable: true,
    render: (row) => (
      <span className="font-medium text-emerald-600">{row.presentClasses}</span>
    ),
  },
  {
    key: "percentage",
    header: "Percentage",
    sortable: true,
    render: (row) => {
      const pct = row.percentage;
      return (
        <div className="flex items-center gap-3">
          <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <span
            className={`text-sm font-bold ${
              pct >= 75 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-red-600"
            }`}
          >
            {pct.toFixed(1)}%
          </span>
        </div>
      );
    },
  },
];

export default function AttendancePage() {
  const { data, isLoading } = useStudentAttendance();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
        <p className="text-sm text-slate-500 mt-1">
          Your attendance across all enrolled subjects
        </p>
      </div>

      <DataTable
        data={data ?? []}
        columns={columns}
        keyExtractor={(row) => row.subject}
        isLoading={isLoading}
      />
    </div>
  );
}