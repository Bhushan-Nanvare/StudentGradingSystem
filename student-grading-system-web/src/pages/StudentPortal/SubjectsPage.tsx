import { useStudentSubjects } from "@/hooks/useStudentPortal";

export default function SubjectsPage() {
  const { data, isLoading } = useStudentSubjects();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Subjects
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Code</th>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Credits</th>
            <th className="border p-3">Semester</th>
            <th className="border p-3">Faculty</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((subject) => (
            <tr key={subject.id}>
              <td className="border p-3">{subject.subjectCode}</td>
              <td className="border p-3">{subject.subjectName}</td>
              <td className="border p-3">{subject.credits}</td>
              <td className="border p-3">{subject.semester}</td>
              <td className="border p-3">{subject.faculty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}