import StudentToolbar from "@/components/student/StudentToolbar";
import StudentTable from "@/components/student/StudentTable";
import { useStudents } from "@/hooks/useStudents";

export default function StudentPage() {
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useStudents();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading students...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <StudentToolbar />

      <StudentTable
        students={students ?? []}
      />
    </div>
  );
}