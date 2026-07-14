import { Button } from "@/components/ui/button";

interface SubjectToolbarProps {
  onAddSubject: () => void;
  isLoading: boolean;
}

export default function SubjectToolbar({
  onAddSubject,
  isLoading,
}: SubjectToolbarProps) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Manage Subjects
          </h1>

          <p className="text-sm text-muted-foreground">
            Create, edit and manage subjects.
          </p>
        </div>

        <Button
          onClick={onAddSubject}
          disabled={isLoading}
        >
          + Add Subject
        </Button>
      </div>
    </div>
  );
}