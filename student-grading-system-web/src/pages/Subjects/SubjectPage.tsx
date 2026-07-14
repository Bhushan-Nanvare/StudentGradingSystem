import { useState } from "react";

import AddSubjectDialog from "@/components/subject/AddSubjectDialog";
import EditSubjectDialog from "@/components/subject/EditSubjectDialog";
import DeleteSubjectDialog from "@/components/subject/DeleteSubjectDialog";

import SubjectTable from "@/components/subject/SubjectTable";
import SubjectToolbar from "@/components/subject/SubjectToolbar";

import { Button } from "@/components/ui/button";

import { useSubjects } from "@/hooks/useSubjects";

import { getErrorMessage } from "@/utils/error";

import type { Subject } from "@/types/subject";

export default function SubjectPage() {
  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [
    isDeleteOpen,
    setIsDeleteOpen,
  ] = useState(false);

  const [
    selectedSubject,
    setSelectedSubject,
  ] =
    useState<Subject | null>(
      null
    );

  const {
    data: subjects = [],
    isLoading,
    isError,
    error,
  } = useSubjects();

  const handleEdit = (
    subject: Subject
  ) => {
    setSelectedSubject(subject);

    setIsEditOpen(true);
  };

  const handleDelete = (
    subject: Subject
  ) => {
    setSelectedSubject(subject);

    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <SubjectToolbar
        onAddSubject={() =>
          setIsAddOpen(true)
        }
        isLoading={isLoading}
      />

      <AddSubjectDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      />

      <EditSubjectDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        subject={selectedSubject}
      />

      <DeleteSubjectDialog
        open={isDeleteOpen}
        onOpenChange={
          setIsDeleteOpen
        }
        subject={selectedSubject}
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
        <SubjectTable
          subjects={subjects}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}