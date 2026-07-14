import { toast } from "sonner";

import { useDeleteSubject } from "@/hooks/useDeleteSubject";

import type { Subject } from "@/types/subject";

import { getErrorMessage } from "@/utils/error";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Subject | null;
}

export default function DeleteSubjectDialog({
  open,
  onOpenChange,
  subject,
}: DeleteSubjectDialogProps) {
  const { mutate, isPending } =
    useDeleteSubject();

  const handleDelete = () => {
    if (!subject) return;

    mutate(subject.id, {
      onSuccess: () => {
        toast.success(
          "Subject deleted successfully."
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
            Delete Subject
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {subject?.name}
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
              : "Delete Subject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}