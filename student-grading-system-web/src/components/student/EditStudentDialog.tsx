import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDepartments } from "@/hooks/useDepartments";
import { useUpdateStudent } from "@/hooks/useUpdateStudent";
import { studentSchema, type StudentFormData } from "@/schemas/studentSchema";
import type { Student } from "@/types/student";
import StudentFormFields from "@/components/student/StudentFormFields";

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export default function EditStudentDialog({
  open,
  onOpenChange,
  student,
}: EditStudentDialogProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      age: 18,
      cgpa: 0,
      departmentId: 0,
    },
  });

  const { mutate, isPending } = useUpdateStudent();
  const { data: departments = [], isLoading: departmentsLoading } = useDepartments();

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        age: student.age,
        cgpa: student.cgpa,
        departmentId: student.departmentId,
      });
    }
  }, [form, student]);

  const handleSubmit = (data: StudentFormData) => {
    if (!student) {
      return;
    }

    mutate(
      { id: student.id, student: data },
      {
        onSuccess: () => {
          toast.success("Student updated successfully");
          onOpenChange(false);
          form.reset();
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Failed to update student");
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
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <StudentFormFields
            form={form}
            departments={departments}
            departmentsLoading={departmentsLoading}
            disabled={isPending}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                onOpenChange(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
