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
import StudentFormFields from "@/components/student/StudentFormFields";
import { useCreateStudent } from "@/hooks/useCreateStudent";
import { useDepartments } from "@/hooks/useDepartments";
import { studentSchema, type StudentFormData } from "@/schemas/studentSchema";
import { getErrorMessage } from "@/utils/error";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddStudentDialog({
  open,
  onOpenChange,
}: AddStudentDialogProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      age: 18,
      rollNumber: "",
      email: "",
      cgpa: 0,
      departmentId: 0,
      facultyId: 0,
    },
  });

  const { mutate, isPending } = useCreateStudent();

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments();

  const handleSubmit = (data: StudentFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Student added successfully");
        form.reset({
          name: "",
          age: 18,
          rollNumber: "",
          email: "",
          cgpa: 0,
          departmentId: 0,
          facultyId: 0,
        });
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
            form.reset({
              name: "",
              age: 18,
              rollNumber: "",
              email: "",
              cgpa: 0,
              departmentId: 0,
            });
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
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
                form.reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding Student..." : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}