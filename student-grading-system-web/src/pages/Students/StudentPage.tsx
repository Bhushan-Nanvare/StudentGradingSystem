import { useEffect, useState } from "react";
import AddStudentDialog from "@/components/student/AddStudentDialog";
import DeleteStudentDialog from "@/components/student/DeleteStudentDialog";
import EditStudentDialog from "@/components/student/EditStudentDialog";
import StudentTable from "@/components/student/StudentTable";
import StudentToolbar from "@/components/student/StudentToolbar";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { getErrorMessage } from "@/utils/error";
import type { Student } from "@/types/student";

type StudentSortField = "id" | "name" | "age" | "department" | "cgpa";
type SortDirection = "asc" | "desc";

export default function StudentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedDepartment, setDebouncedDepartment] = useState("");
  const [sortBy, setSortBy] = useState<StudentSortField>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedDepartment(departmentFilter.trim());
    }, 400);

    return () => window.clearTimeout(timer);
  }, [departmentFilter]);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearch, debouncedDepartment, sortBy, sortDirection, pageSize]);

  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useStudents({
    name: debouncedSearch,
    department: debouncedDepartment,
    sortBy,
    descending: sortDirection === "desc",
    pageNumber,
    pageSize,
  });

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handlePrevious = () => {
    setPageNumber((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    setPageNumber((currentPage) => currentPage + 1);
  };

  return (
    <div className="space-y-6 p-6">
      <StudentToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={setDepartmentFilter}
        sortBy={sortBy}
        onSortByChange={(value) => setSortBy(value as StudentSortField)}
        sortDirection={sortDirection}
        onSortDirectionToggle={() => setSortDirection((current) => (current === "asc" ? "desc" : "asc"))}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        onAddStudent={() => setIsAddOpen(true)}
        isLoading={isLoading}
      />

      <AddStudentDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
      <EditStudentDialog open={isEditOpen} onOpenChange={setIsEditOpen} student={selectedStudent} />
      <DeleteStudentDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} student={selectedStudent} />

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {getErrorMessage(error)}
          <div className="mt-3">
            <Button type="button" variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <>
          <StudentTable students={students} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />

          {!isLoading && students.length > 0 && (
            <div className="flex flex-col gap-3 rounded-lg border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">Page {pageNumber}</div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={pageNumber === 1 || isLoading}>
                  Previous
                </Button>
                <Button type="button" variant="outline" onClick={handleNext} disabled={students.length < pageSize || isLoading}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}