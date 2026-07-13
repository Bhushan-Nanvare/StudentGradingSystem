import type { UseFormReturn } from "react-hook-form";
import type { DepartmentFormData } from "@/schemas/departmentSchema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DepartmentFormFieldsProps {
  form: UseFormReturn<DepartmentFormData>;
  disabled?: boolean;
}

export default function DepartmentFormFields({
  form,
  disabled = false,
}: DepartmentFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Department Name
        </Label>

        <Input
          id="name"
          placeholder="Department Name"
          disabled={disabled}
          {...form.register("name")}
        />

        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
    </div>
  );
}