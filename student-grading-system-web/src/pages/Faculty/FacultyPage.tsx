import { useState } from "react";

import AddFacultyDialog from "@/components/faculty/AddFacultyDialog";
import DeleteFacultyDialog from "@/components/faculty/DeleteFacultyDialog";
import EditFacultyDialog from "@/components/faculty/EditFacultyDialog";
import FacultyTable from "@/components/faculty/FacultyTable";
import FacultyToolbar from "@/components/faculty/FacultyToolbar";

import { Button } from "@/components/ui/button";

import { useFaculties } from "@/hooks/useFaculties";

import { getErrorMessage } from "@/utils/error";

import type { Faculty } from "@/types/faculty";

export default function FacultyPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedFaculty, setSelectedFaculty] =
    useState<Faculty | null>(null);

  const {
    data: faculties = [],
    isLoading,
    isError,
    error,
  } = useFaculties();

  const handleEdit = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsEditOpen(true);
  };

  const handleDelete = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <FacultyToolbar
        onAddFaculty={() => setIsAddOpen(true)}
        isLoading={isLoading}
      />

      <AddFacultyDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      />

      <EditFacultyDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        faculty={selectedFaculty}
      />

      <DeleteFacultyDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        faculty={selectedFaculty}
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
        <FacultyTable
          faculties={faculties}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}