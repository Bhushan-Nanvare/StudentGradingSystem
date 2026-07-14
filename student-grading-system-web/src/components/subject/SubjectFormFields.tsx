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
import type { Faculty } from "@/types/faculty";
import type { SubjectFormData } from "@/schemas/subjectSchema";

interface SubjectFormFieldsProps {
  form: UseFormReturn<SubjectFormData>;

  departments: Department[];
  departmentsLoading: boolean;

  faculties: Faculty[];
  facultiesLoading: boolean;

  disabled?: boolean;
}

export default function SubjectFormFields({
  form,
  departments,
  departmentsLoading,
  faculties,
  facultiesLoading,
  disabled = false,
}: SubjectFormFieldsProps) {
  const selectedDepartment =
    form.watch("departmentId")?.toString() ?? "";

  const selectedFaculty =
    form.watch("facultyId")?.toString() ?? "";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subjectCode">
            Subject Code
          </Label>

          <Input
            id="subjectCode"
            disabled={disabled}
            {...form.register("subjectCode")}
          />

          {form.formState.errors.subjectCode && (
            <p className="text-sm text-red-500">
              {form.formState.errors.subjectCode.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="semester">
            Semester
          </Label>

          <Input
            id="semester"
            type="number"
            disabled={disabled}
            {...form.register("semester", {
              valueAsNumber: true,
            })}
          />

          {form.formState.errors.semester && (
            <p className="text-sm text-red-500">
              {form.formState.errors.semester.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Subject Name
        </Label>

        <Input
          id="name"
          disabled={disabled}
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="credits">
          Credits
        </Label>

        <Input
          id="credits"
          type="number"
          step="0.5"
          disabled={disabled}
          {...form.register("credits", {
            valueAsNumber: true,
          })}
        />

        {form.formState.errors.credits && (
          <p className="text-sm text-red-500">
            {form.formState.errors.credits.message}
          </p>
        )}
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
              <SelectItem
                value="loading"
                disabled
              >
                Loading...
              </SelectItem>
            )}

            {departments.map((department) => (
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

      <div className="space-y-2">
        <Label>
          Faculty
        </Label>

        <Select
          value={selectedFaculty}
          disabled={disabled}
          onValueChange={(value) =>
            form.setValue(
              "facultyId",
              Number(value),
              {
                shouldValidate: true,
              }
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Faculty" />
          </SelectTrigger>

          <SelectContent>
            {facultiesLoading && (
              <SelectItem
                value="loading"
                disabled
              >
                Loading...
              </SelectItem>
            )}

            {faculties.map((faculty) => (
              <SelectItem
                key={faculty.id}
                value={faculty.id.toString()}
              >
                {faculty.firstName}{" "}
                {faculty.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {form.formState.errors.facultyId && (
          <p className="text-sm text-red-500">
            {form.formState.errors.facultyId.message}
          </p>
        )}
      </div>
    </div>
  );
}