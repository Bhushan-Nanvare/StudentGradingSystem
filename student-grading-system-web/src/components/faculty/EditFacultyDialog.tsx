import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  facultySchema,
  type FacultyFormData,
} from "@/schemas/facultySchema";

import FacultyFormFields from "./FacultyFormFields";

import { useDepartments } from "@/hooks/useDepartments";
import { useUpdateFaculty } from "@/hooks/useUpdateFaculty";

import { getErrorMessage } from "@/utils/error";

import type { Faculty } from "@/types/faculty";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditFacultyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: Faculty | null;
}

export default function EditFacultyDialog({
  open,
  onOpenChange,
  faculty,
}: EditFacultyDialogProps) {
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

  const { mutate, isPending } = useUpdateFaculty();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  useEffect(() => {
    if (faculty) {
      form.reset({
        employeeCode: faculty.employeeCode,
        firstName: faculty.firstName,
        lastName: faculty.lastName,
        email: faculty.email,
        designation: faculty.designation,
        salary: faculty.salary,
        joiningDate: faculty.joiningDate.substring(0, 10),
        departmentId: faculty.departmentId,
      });
    }
  }, [faculty, form]);

  const handleSubmit = (data: FacultyFormData) => {
    if (!faculty) return;

    mutate(
      {
        id: faculty.id,
        faculty: data,
      },
      {
        onSuccess: () => {
          toast.success("Faculty updated successfully.");
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Faculty</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FacultyFormFields
            form={form}
            departments={departments}
            departmentsLoading={departmentsLoading}
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
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}