import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteStudent } from "@/hooks/useDeleteStudent";
import type { Student } from "@/types/student";
import { toast } from "sonner";

interface DeleteStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export default function DeleteStudentDialog({
  open,
  onOpenChange,
  student,
}: DeleteStudentDialogProps) {
  const { mutate, isPending } = useDeleteStudent();

  const handleDelete = () => {
    if (!student) {
      return;
    }

    mutate(student.id, {
      onSuccess: () => {
        toast.success("Student deleted successfully");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Failed to delete student");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={isPending ? () => undefined : onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Student</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This will soft delete {student?.name ?? "this student"}. You can still restore it via the backend data store if needed.
        </p>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" disabled={isPending} onClick={handleDelete}>
            {isPending ? "Deleting..." : "Delete Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
