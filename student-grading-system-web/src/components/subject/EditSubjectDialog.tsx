import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  subjectSchema,
  type SubjectFormData,
} from "@/schemas/subjectSchema";

import SubjectFormFields from "./SubjectFormFields";

import { useDepartments } from "@/hooks/useDepartments";
import { useFaculties } from "@/hooks/useFaculties";
import { useUpdateSubject } from "@/hooks/useUpdateSubject";

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

interface EditSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Subject | null;
}

export default function EditSubjectDialog({
  open,
  onOpenChange,
  subject,
}: EditSubjectDialogProps) {
  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),

    defaultValues: {
      subjectCode: "",
      name: "",
      credits: 1,
      semester: 1,
      departmentId: 0,
      facultyId: 0,
    },
  });

  const { mutate, isPending } =
    useUpdateSubject();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  const {
    data: faculties = [],
    isLoading: facultiesLoading,
  } = useFaculties();

  useEffect(() => {
    if (subject) {
      form.reset({
        subjectCode: subject.subjectCode,
        name: subject.name,
        credits: subject.credits,
        semester: subject.semester,
        departmentId: subject.departmentId,
        facultyId: subject.facultyId,
      });
    }
  }, [subject, form]);

  const handleSubmit = (
    data: SubjectFormData
  ) => {
    if (!subject) return;

    mutate(
      {
        id: subject.id,
        subject: data,
      },
      {
        onSuccess: () => {
          toast.success(
            "Subject updated successfully."
          );

          form.reset();

          onOpenChange(false);
        },

        onError: (error) => {
          toast.error(
            getErrorMessage(error)
          );
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
          <DialogTitle>
            Edit Subject
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
            departments={departments}
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
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}