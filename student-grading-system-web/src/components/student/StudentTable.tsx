import { Button } from "@/components/ui/button";
import type { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
}: StudentTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
        Loading students...
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-10 text-center text-sm text-muted-foreground">
        No students found for the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-3">Id</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">CGPA</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-3">{student.id}</td>
              <td className="px-4 py-3 font-medium">{student.name}</td>
              <td className="px-4 py-3">{student.age}</td>
              <td className="px-4 py-3">{student.departmentName}</td>
              <td className="px-4 py-3">{student.cgpa.toFixed(2)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                  <Button type="button" variant="destructive" size="sm" onClick={() => onDelete(student)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}