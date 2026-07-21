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
      {/* Name */}
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

      {/* Roll Number */}
      <div className="space-y-2">
        <Label htmlFor="rollNumber">Roll Number</Label>
        <Input
          id="rollNumber"
          placeholder="CS24001"
          disabled={disabled}
          {...form.register("rollNumber")}
        />
        {form.formState.errors.rollNumber && (
          <p className="text-sm text-red-500">
            {form.formState.errors.rollNumber.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="student@example.com"
          disabled={disabled}
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Age + CGPA */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="1"
            max="100"
            disabled={disabled}
            {...form.register("age", {
              valueAsNumber: true,
            })}
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
            disabled={disabled}
            {...form.register("cgpa", {
              valueAsNumber: true,
            })}
          />
          {form.formState.errors.cgpa && (
            <p className="text-sm text-red-500">
              {form.formState.errors.cgpa.message}
            </p>
          )}
        </div>
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label>Department</Label>

        <Select
          value={selectedDepartment}
          disabled={disabled}
          onValueChange={(value) => {
            form.setValue("departmentId", Number(value), {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>

          <SelectContent>
            {departmentsLoading && (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            )}

            {!departmentsLoading &&
              departments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
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