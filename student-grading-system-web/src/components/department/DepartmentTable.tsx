import { Button } from "@/components/ui/button";
import type { Department } from "@/types/department";

interface DepartmentTableProps {
  departments: Department[];
  isLoading: boolean;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

export default function DepartmentTable({
  departments,
  isLoading,
  onEdit,
  onDelete,
}: DepartmentTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
        Loading departments...
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-10 text-center text-sm text-muted-foreground">
        No departments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            <th className="px-4 py-3 text-left">Id</th>
            <th className="px-4 py-3 text-left">Department Name</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {department.id}
              </td>

              <td className="px-4 py-3 font-medium">
                {department.name}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onEdit(department)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete(department)
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