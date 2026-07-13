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

import type { Department } from "@/types/department";
import type { FacultyFormData } from "@/schemas/facultySchema";

interface FacultyFormFieldsProps {
  form: UseFormReturn<FacultyFormData>;
  departments: Department[];
  departmentsLoading: boolean;
  disabled?: boolean;
}

export default function FacultyFormFields({
  form,
  departments,
  departmentsLoading,
  disabled = false,
}: FacultyFormFieldsProps) {
  const selectedDepartment =
    form.watch("departmentId")?.toString() ?? "";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employeeCode">
            Employee Code
          </Label>

          <Input
            id="employeeCode"
            disabled={disabled}
            {...form.register("employeeCode")}
          />

          {form.formState.errors.employeeCode && (
            <p className="text-sm text-red-500">
              {form.formState.errors.employeeCode.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">
            Designation
          </Label>

          <Input
            id="designation"
            disabled={disabled}
            {...form.register("designation")}
          />

          {form.formState.errors.designation && (
            <p className="text-sm text-red-500">
              {form.formState.errors.designation.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name
          </Label>

          <Input
            id="firstName"
            disabled={disabled}
            {...form.register("firstName")}
          />

          {form.formState.errors.firstName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name
          </Label>

          <Input
            id="lastName"
            disabled={disabled}
            {...form.register("lastName")}
          />

          {form.formState.errors.lastName && (
            <p className="text-sm text-red-500">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          type="email"
          disabled={disabled}
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="salary">
            Salary
          </Label>

          <Input
            id="salary"
            type="number"
            disabled={disabled}
            {...form.register("salary", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.salary && (
            <p className="text-sm text-red-500">
              {form.formState.errors.salary.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="joiningDate">
            Joining Date
          </Label>

          <Input
            id="joiningDate"
            type="date"
            disabled={disabled}
            {...form.register("joiningDate")}
          />

          {form.formState.errors.joiningDate && (
            <p className="text-sm text-red-500">
              {form.formState.errors.joiningDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Department
        </Label>

        <Select
          value={selectedDepartment}
          disabled={disabled}
          onValueChange={(value) =>
            form.setValue(
              "departmentId",
              Number(value),
              {
                shouldValidate: true,
              }
            )
          }
        >
          <SelectTrigger className="w-full">
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