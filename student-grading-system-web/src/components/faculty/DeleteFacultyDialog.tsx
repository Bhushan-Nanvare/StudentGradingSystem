import { toast } from "sonner";

import { useDeleteFaculty } from "@/hooks/useDeleteFaculty";

import type { Faculty } from "@/types/faculty";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getErrorMessage } from "@/utils/error";

interface DeleteFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: Faculty | null;
}

export default function DeleteFacultyDialog({
  open,
  onOpenChange,
  faculty,
}: DeleteFacultyDialogProps) {
  const { mutate, isPending } =
    useDeleteFaculty();

  const handleDelete = () => {
    if (!faculty) return;

    mutate(faculty.id, {
      onSuccess: () => {
        toast.success(
          "Faculty deleted successfully."
        );

        onOpenChange(false);
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(error)
        );
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={
        isPending
          ? () => undefined
          : onOpenChange
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete Faculty
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to
          delete{" "}
          <span className="font-semibold">
            {faculty?.firstName}{" "}
            {faculty?.lastName}
          </span>
          ?
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending
              ? "Deleting..."
              : "Delete Faculty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}