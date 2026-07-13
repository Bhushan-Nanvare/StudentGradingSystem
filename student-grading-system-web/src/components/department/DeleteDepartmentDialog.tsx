import { toast } from "sonner";

import type { Department } from "@/types/department";

import { useDeleteDepartment } from "@/hooks/useDeleteDepartment";

import { getErrorMessage } from "@/utils/error";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
}

export default function DeleteDepartmentDialog({
  open,
  onOpenChange,
  department,
}: DeleteDepartmentDialogProps) {
  const { mutate, isPending } =
    useDeleteDepartment();

  const handleDelete = () => {
    if (!department) return;

    mutate(department.id, {
      onSuccess: () => {
        toast.success(
          "Department deleted successfully."
        );

        onOpenChange(false);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
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
            Delete Department
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <strong>
            {department?.name}
          </strong>
          ?
        </p>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending
              ? "Deleting..."
              : "Delete Department"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}