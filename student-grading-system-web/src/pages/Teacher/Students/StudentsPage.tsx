import { useParams } from "react-router-dom";
import { useMyStudents } from "@/hooks/useMyStudents";
import DataTable, { type Column } from "@/components/common/DataTable";
import EmptyState from "@/components/common/EmptyState";
import { Users } from "lucide-react";

type Student = {
  id: number;
  name: string;
  departmentName: string;
  cgpa: number;
};

const columns: Column<Student>[] = [
  { key: "id", header: "#", sortable: true },
  { key: "name", header: "Student Name", sortable: true },
  { key: "departmentName", header: "Department", sortable: true },
  {
    key: "cgpa",
    header: "CGPA",
    sortable: true,
    render: (row) => (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        row.cgpa >= 8 ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" :
        row.cgpa >= 6 ? "bg-amber-50 text-amber-700 ring-amber-600/20" :
        "bg-red-50 text-red-700 ring-red-600/20"
      }`}>
        {row.cgpa.toFixed(2)}
      </span>
    ),
  },
];

export default function StudentsPage() {
  const { subjectId } = useParams();
  const { data, isLoading } = useMyStudents(Number(subjectId));

  const students = (data as Student[] | undefined) ?? [];

  if (!isLoading && students.length === 0) {
    return (
      <EmptyState
        title="No Students Enrolled"
        description="No students are currently enrolled in this subject."
        icon={<Users className="h-8 w-8 text-slate-400" />}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Enrolled Students {!isLoading && `(${students.length})`}
        </h2>
      </div>

      <DataTable
        data={students}
        columns={columns}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
      />
    </div>
  );
}