import type { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({
  students,
}: StudentTableProps) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Id</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Age</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">CGPA</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-3">{student.id}</td>
              <td className="px-4 py-3">{student.name}</td>
              <td className="px-4 py-3">{student.age}</td>
              <td className="px-4 py-3">{student.departmentId}</td>
              <td className="px-4 py-3">{student.cgpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}