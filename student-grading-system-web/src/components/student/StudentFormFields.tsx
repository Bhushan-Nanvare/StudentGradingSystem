import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Department } from "@/services/departmentService";
import type { StudentFormData } from "@/schemas/studentSchema";

interface StudentFormFieldsProps {
  form: UseFormReturn<StudentFormData>;
  departments: Department[];
  departmentsLoading: boolean;
  disabled?: boolean;
}

export default function StudentFormFields({
  form,
  departments,
  departmentsLoading,
  disabled = false,
}: StudentFormFieldsProps) {
  const selectedDepartment = form.watch("departmentId")?.toString() ?? "";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Student Name"
          disabled={disabled}
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="100"
            placeholder="Age"
            disabled={disabled}
            {...form.register("age", { valueAsNumber: true })}
          />
          {form.formState.errors.age && (
            <p className="text-sm text-red-500">
              {form.formState.errors.age.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cgpa">CGPA</Label>
          <Input
            id="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="CGPA"
            disabled={disabled}
            {...form.register("cgpa", { valueAsNumber: true })}
          />
          {form.formState.errors.cgpa && (
            <p className="text-sm text-red-500">
              {form.formState.errors.cgpa.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          value={selectedDepartment}
          disabled={disabled}
          onValueChange={(value) => {
            form.setValue("departmentId", Number(value), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger id="department" className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departmentsLoading && (
              <SelectItem value="loading" disabled>
                Loading departments...
              </SelectItem>
            )}
            {!departmentsLoading && departments.length === 0 && (
              <SelectItem value="empty" disabled>
                No departments available
              </SelectItem>
            )}
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id.toString()}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.departmentId && (
          <p className="text-sm text-red-500">
            {form.formState.errors.departmentId.message}
          </p>
        )}
      </div>
    </div>
  );
}
