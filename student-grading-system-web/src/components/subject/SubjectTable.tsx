import { Button } from "@/components/ui/button";
import type { Subject } from "@/types/subject";

interface SubjectTableProps {
  subjects: Subject[];
  isLoading: boolean;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
}

export default function SubjectTable({
  subjects,
  isLoading,
  onEdit,
  onDelete,
}: SubjectTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-background p-6 text-sm text-muted-foreground">
        Loading subjects...
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="rounded-lg border bg-background p-10 text-center text-sm text-muted-foreground">
        No subjects found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Credits</th>
            <th className="px-4 py-3">Semester</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Faculty</th>
            <th className="px-4 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject.id}
              className="border-t"
            >
              <td className="px-4 py-3">
                {subject.subjectCode}
              </td>

              <td className="px-4 py-3 font-medium">
                {subject.name}
              </td>

              <td className="px-4 py-3">
                {subject.credits}
              </td>

              <td className="px-4 py-3">
                {subject.semester}
              </td>

              <td className="px-4 py-3">
                {subject.departmentName}
              </td>

              <td className="px-4 py-3">
                {subject.facultyName}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      onEdit(subject)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      onDelete(subject)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}