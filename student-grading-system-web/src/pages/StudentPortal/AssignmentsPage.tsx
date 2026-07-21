import { useStudentAssignments } from "@/hooks/useStudentPortal";

export default function AssignmentsPage() {
  const { data, isLoading } = useStudentAssignments();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Assignments
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Title</th>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Due Date</th>
            <th className="border p-3">Max Marks</th>
            <th className="border p-3">Submitted</th>
            <th className="border p-3">Marks</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((assignment) => (
            <tr key={assignment.assignmentId}>
              <td className="border p-3">{assignment.title}</td>
              <td className="border p-3">{assignment.subject}</td>
              <td className="border p-3">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </td>
              <td className="border p-3">{assignment.maxMarks}</td>
              <td className="border p-3">
                {assignment.submitted ? "Yes" : "No"}
              </td>
              <td className="border p-3">
                {assignment.marksObtained ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}