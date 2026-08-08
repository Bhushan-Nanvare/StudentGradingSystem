import { useStudentSubjects } from "@/hooks/useStudentPortal";
import DataTable, { type Column } from "@/components/common/DataTable";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import type { StudentSubject } from "@/types/studentPortal";

const columns: Column<StudentSubject>[] = [
  {
    key: "subjectCode",
    header: "Code",
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {row.subjectCode}
      </span>
    ),
  },
  { key: "subjectName", header: "Subject", sortable: true },
  {
    key: "credits",
    header: "Credits",
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
        {row.credits}
      </span>
    ),
  },
  {
    key: "semester",
    header: "Semester",
    sortable: true,
    render: (row) => (
      <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
        Sem {row.semester}
      </span>
    ),
  },
  { key: "faculty", header: "Faculty", sortable: true },
];

export default function SubjectsPage() {
  const { data, isLoading } = useStudentSubjects();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
        <p className="text-sm text-slate-500 mt-1">
          {data?.length ?? 0} subjects enrolled this semester
        </p>
      </div>

      <DataTable
        data={data ?? []}
        columns={columns}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />
    </div>
  );
}