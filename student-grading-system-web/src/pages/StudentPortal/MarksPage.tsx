import { useStudentMarks } from "@/hooks/useStudentPortal";

export default function MarksPage() {
  const { data, isLoading } = useStudentMarks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Marks
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Assessment</th>
            <th className="border p-3">Marks</th>
            <th className="border p-3">Max Marks</th>
            <th className="border p-3">Percentage</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((mark, index) => (
            <tr key={index}>
              <td className="border p-3">{mark.subject}</td>
              <td className="border p-3">{mark.assessmentType}</td>
              <td className="border p-3">{mark.marksObtained}</td>
              <td className="border p-3">{mark.maxMarks}</td>
              <td className="border p-3">{mark.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}