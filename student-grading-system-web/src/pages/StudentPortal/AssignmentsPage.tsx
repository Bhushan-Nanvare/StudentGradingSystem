import { useStudentAssignments } from "@/hooks/useStudentPortal";
import DataTable, { type Column } from "@/components/common/DataTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import type { StudentAssignment } from "@/types/studentPortal";

const columns: Column<StudentAssignment>[] = [
  { key: "title", header: "Title", sortable: true },
  { key: "subject", header: "Subject", sortable: true },
  {
    key: "dueDate",
    header: "Due Date",
    sortable: true,
    render: (row) => {
      const isPast = new Date(row.dueDate) < new Date();
      return (
        <span className={`text-sm ${isPast && !row.submitted ? "text-red-600 font-medium" : "text-slate-600"}`}>
          {new Date(row.dueDate).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    key: "maxMarks",
    header: "Max Marks",
    sortable: true,
    render: (row) => <span className="font-medium">{row.maxMarks}</span>,
  },
  {
    key: "submitted",
    header: "Status",
    sortable: true,
    render: (row) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
          row.submitted
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
            : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
        }`}
      >
        {row.submitted ? "✓ Submitted" : "⏳ Pending"}
      </span>
    ),
  },
  {
    key: "marksObtained",
    header: "Marks",
    sortable: false,
    render: (row) =>
      row.marksObtained != null ? (
        <span className="font-semibold text-blue-700">{row.marksObtained}</span>
      ) : (
        <span className="text-slate-400">—</span>
      ),
  },
];

export default function AssignmentsPage() {
  const { data, isLoading } = useStudentAssignments();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your assignment submissions and grades
        </p>
      </div>

      <DataTable
        data={data ?? []}
        columns={columns}
        keyExtractor={(row) => row.assignmentId}
        isLoading={isLoading}
      />
    </div>
  );
}