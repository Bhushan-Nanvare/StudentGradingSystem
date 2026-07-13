import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  departmentSchema,
  type DepartmentFormData,
} from "@/schemas/departmentSchema";

import { useCreateDepartment } from "@/hooks/useCreateDepartment";

import { getErrorMessage } from "@/utils/error";

import DepartmentFormFields from "./DepartmentFormFields";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDepartmentDialog({
  open,
  onOpenChange,
}: AddDepartmentDialogProps) {
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),

    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } =
    useCreateDepartment();

  const handleSubmit = (
    data: DepartmentFormData
  ) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          "Department added successfully."
        );

        form.reset();

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
      onOpenChange={(value) => {
        if (!isPending) {
          onOpenChange(value);

          if (!value) {
            form.reset();
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Add Department
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit
          )}
          className="space-y-4"
        >
          <DepartmentFormFields
            form={form}
            disabled={isPending}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                form.reset();

                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Adding..."
                : "Add Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}