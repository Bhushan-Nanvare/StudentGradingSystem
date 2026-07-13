import { Button } from "@/components/ui/button";

interface DepartmentToolbarProps {
  onAddDepartment: () => void;
  isLoading: boolean;
}

export default function DepartmentToolbar({
  onAddDepartment,
  isLoading,
}: DepartmentToolbarProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Departments
          </h1>

          <p className="text-sm text-muted-foreground">
            Create, edit and manage departments.
          </p>
        </div>

        <Button
          onClick={onAddDepartment}
          disabled={isLoading}
        >
          + Add Department
        </Button>
      </div>
    </div>
  );
}