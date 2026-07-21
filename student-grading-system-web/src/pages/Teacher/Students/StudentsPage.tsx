import { useNavigate, useParams } from "react-router-dom";
import { useMyStudents } from "@/hooks/useMyStudents";

type Student = {
  id: number;
  name: string;
  departmentName: string;
  cgpa: number;
};

export default function StudentsPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useMyStudents(Number(subjectId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Students</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Department</th>
            <th className="border p-3">CGPA</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {(data as Student[] | undefined)?.map((student) => (
            <tr key={student.id}>
              <td className="border p-3">{student.name}</td>

              <td className="border p-3">
                {student.departmentName}
              </td>

              <td className="border p-3">
                {student.cgpa}
              </td>

              <td className="border p-3">
                <button
                  className="rounded bg-blue-600 px-3 py-2 text-white"
                  onClick={() =>
                    navigate(`/teacher/subjects/${subjectId}`)
                  }
                >
                  Take Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}