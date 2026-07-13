import { Button } from "@/components/ui/button";

interface FacultyToolbarProps {
  onAddFaculty: () => void;
  isLoading: boolean;
}

export default function FacultyToolbar({
  onAddFaculty,
  isLoading,
}: FacultyToolbarProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Faculty
          </h1>

          <p className="text-sm text-muted-foreground">
            Create, edit and manage faculty
            members.
          </p>
        </div>

        <Button
          onClick={onAddFaculty}
          disabled={isLoading}
        >
          + Add Faculty
        </Button>
      </div>
    </div>
  );
}