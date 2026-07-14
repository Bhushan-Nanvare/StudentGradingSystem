import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  subjectSchema,
  type SubjectFormData,
} from "@/schemas/subjectSchema";

import SubjectFormFields from "./SubjectFormFields";

import { useCreateSubject } from "@/hooks/useCreateSubject";
import { useDepartments } from "@/hooks/useDepartments";
import { useFaculties } from "@/hooks/useFaculties";

import { getErrorMessage } from "@/utils/error";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddSubjectDialog({
  open,
  onOpenChange,
}: AddSubjectDialogProps) {
  const form =
    useForm<SubjectFormData>({
      resolver:
        zodResolver(subjectSchema),

      defaultValues: {
        subjectCode: "",
        name: "",
        credits: 1,
        semester: 1,
        departmentId: 0,
        facultyId: 0,
      },
    });

  const {
    mutate,
    isPending,
  } = useCreateSubject();

  const {
    data: departments = [],
    isLoading:
      departmentsLoading,
  } = useDepartments();

  const {
    data: faculties = [],
    isLoading:
      facultiesLoading,
  } = useFaculties();

  const handleSubmit = (
    data: SubjectFormData
  ) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          "Subject added successfully."
        );

        form.reset();

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
            Add Subject
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit
          )}
          className="space-y-4"
        >
          <SubjectFormFields
            form={form}
            departments={
              departments
            }
            departmentsLoading={
              departmentsLoading
            }
            faculties={faculties}
            facultiesLoading={
              facultiesLoading
            }
            disabled={isPending}
          />

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
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
                : "Add Subject"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}