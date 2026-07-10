import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortDirection: "asc" | "desc";
  onSortDirectionToggle: () => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onAddStudent: () => void;
  isLoading: boolean;
}

export default function StudentToolbar({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  sortBy,
  onSortByChange,
  sortDirection,
  onSortDirectionToggle,
  pageSize,
  onPageSizeChange,
  onAddStudent,
  isLoading,
}: StudentToolbarProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-background p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage All Students</h1>
          <p className="text-sm text-muted-foreground">Search, filter, sort, and manage student records.</p>
        </div>

        <Button type="button" onClick={onAddStudent} disabled={isLoading}>
          + Add Student
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          disabled={isLoading}
        />

        <Input
          placeholder="Filter by department"
          value={departmentFilter}
          onChange={(event) => onDepartmentFilterChange(event.target.value)}
          disabled={isLoading}
        />

        <Select value={sortBy} onValueChange={onSortByChange} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="cgpa">CGPA</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onSortDirectionToggle} disabled={isLoading}>
            {sortDirection === "asc" ? "Ascending" : "Descending"}
          </Button>

          <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 / page</SelectItem>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="20">20 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}