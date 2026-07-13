import { Button } from "@/components/ui/button";
import type { Faculty } from "@/types/faculty";

interface FacultyTableProps {
  faculties: Faculty[];
  isLoading: boolean;
  onEdit: (faculty: Faculty) => void;
  onDelete: (faculty: Faculty) => void;
}

export default function FacultyTable({
  faculties,
  isLoading,
  onEdit,
  onDelete,
}: FacultyTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
        Loading faculties...
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-10 text-center text-sm text-muted-foreground">
        No faculty members found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">First Name</th>
            <th className="px-4 py-3">Last Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Designation</th>
            <th className="px-4 py-3">Salary</th>
            <th className="px-4 py-3">Joining Date</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {faculties.map((faculty) => (
            <tr
              key={faculty.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {faculty.employeeCode}
              </td>

              <td className="px-4 py-3">
                {faculty.firstName}
              </td>

              <td className="px-4 py-3">
                {faculty.lastName}
              </td>

              <td className="px-4 py-3">
                {faculty.email}
              </td>

              <td className="px-4 py-3">
                {faculty.designation}
              </td>

              <td className="px-4 py-3">
                ₹
                {faculty.salary.toLocaleString()}
              </td>

              <td className="px-4 py-3">
                {new Date(
                  faculty.joiningDate
                ).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {faculty.departmentName}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onEdit(faculty)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete(faculty)
                    }
                  >
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