import { useState } from "react";

import AddDepartmentDialog from "@/components/department/AddDepartmentDialog";
import DeleteDepartmentDialog from "@/components/department/DeleteDepartmentDialog";
import EditDepartmentDialog from "@/components/department/EditDepartmentDialog";
import DepartmentTable from "@/components/department/DepartmentTable";
import DepartmentToolbar from "@/components/department/DepartmentToolbar";

import { Button } from "@/components/ui/button";

import { useDepartments } from "@/hooks/useDepartments";

import { getErrorMessage } from "@/utils/error";

import type { Department } from "@/types/department";

export default function DepartmentPage() {
  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [
    selectedDepartment,
    setSelectedDepartment,
  ] =
    useState<Department | null>(null);

  const {
    data: departments = [],
    isLoading,
    isError,
    error,
  } = useDepartments();

  const handleEdit = (
    department: Department
  ) => {
    setSelectedDepartment(department);
    setIsEditOpen(true);
  };

  const handleDelete = (
    department: Department
  ) => {
    setSelectedDepartment(department);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <DepartmentToolbar
        onAddDepartment={() =>
          setIsAddOpen(true)
        }
        isLoading={isLoading}
      />

      <AddDepartmentDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      />

      <EditDepartmentDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        department={selectedDepartment}
      />

      <DeleteDepartmentDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        department={selectedDepartment}
      />

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {getErrorMessage(error)}

          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() =>
                window.location.reload()
              }
            >
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <DepartmentTable
          departments={departments}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}