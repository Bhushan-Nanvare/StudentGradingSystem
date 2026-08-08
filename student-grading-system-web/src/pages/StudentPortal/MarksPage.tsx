import { useStudentMarks } from "@/hooks/useStudentPortal";
import DataTable, { type Column } from "@/components/common/DataTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import type { StudentMark } from "@/types/studentPortal";

const columns: Column<StudentMark>[] = [
  { key: "subject", header: "Subject", sortable: true },
  {
    key: "assessmentType",
    header: "Assessment",
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
        {row.assessmentType}
      </span>
    ),
  },
  {
    key: "marksObtained",
    header: "Marks",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-slate-800">
        {row.marksObtained} <span className="text-slate-400 font-normal">/ {row.maxMarks}</span>
      </span>
    ),
  },
  {
    key: "percentage",
    header: "Percentage",
    sortable: true,
    render: (row) => {
      const pct = row.percentage;
      return (
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
            pct >= 75
              ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
              : pct >= 50
              ? "bg-amber-50 text-amber-700 ring-amber-600/20"
              : "bg-red-50 text-red-700 ring-red-600/20"
          }`}
        >
          {pct.toFixed(1)}%
        </span>
      );
    },
  },
];

export default function MarksPage() {
  const { data, isLoading } = useStudentMarks();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Marks</h1>
        <p className="text-sm text-slate-500 mt-1">
          Your marks across all assessments and subjects
        </p>
      </div>

      <DataTable
        data={data ?? []}
        columns={columns}
        keyExtractor={(row) => `${row.subject}-${row.assessmentType}`}
        isLoading={isLoading}
      />
    </div>
  );
}