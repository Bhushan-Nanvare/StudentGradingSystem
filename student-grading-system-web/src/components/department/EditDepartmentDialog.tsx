import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  departmentSchema,
  type DepartmentFormData,
} from "@/schemas/departmentSchema";

import type { Department } from "@/types/department";

import { useUpdateDepartment } from "@/hooks/useUpdateDepartment";

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

interface EditDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
}

export default function EditDepartmentDialog({
  open,
  onOpenChange,
  department,
}: EditDepartmentDialogProps) {
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useUpdateDepartment();

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
      });
    }
  }, [department, form]);

  const handleSubmit = (
    data: DepartmentFormData
  ) => {
    if (!department) return;

    mutate(
      {
        id: department.id,
        department: data,
      },
      {
        onSuccess: () => {
          toast.success(
            "Department updated successfully."
          );

          form.reset();

          onOpenChange(false);
        },

        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
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
            Edit Department
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}