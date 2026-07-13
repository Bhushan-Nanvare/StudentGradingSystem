import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  facultySchema,
  type FacultyFormData,
} from "@/schemas/facultySchema";

import FacultyFormFields from "./FacultyFormFields";

import { useCreateFaculty } from "@/hooks/useCreateFaculty";
import { useDepartments } from "@/hooks/useDepartments";

import { getErrorMessage } from "@/utils/error";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddFacultyDialog({
  open,
  onOpenChange,
}: AddFacultyDialogProps) {
  const form = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),

    defaultValues: {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      designation: "",
      salary: 0,
      joiningDate: "",
      departmentId: 0,
    },
  });

  const { mutate, isPending } =
    useCreateFaculty();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  const handleSubmit = (
    data: FacultyFormData
  ) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          "Faculty added successfully."
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Add Faculty
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit
          )}
          className="space-y-4"
        >
          <FacultyFormFields
            form={form}
            departments={departments}
            departmentsLoading={
              departmentsLoading
            }
            disabled={isPending}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
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
                : "Add Faculty"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}