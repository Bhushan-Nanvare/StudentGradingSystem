import { useParams } from "react-router-dom";
import { useMyStudents } from "@/hooks/useMyStudents";

export default function StudentsPage() {
  const { subjectId } = useParams();

  const {
    data,
    isLoading,
  } = useMyStudents(Number(subjectId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Students
      </h1>

      {data?.map((student: any) => (
        <div
          key={student.id}
          className="rounded-lg border p-4"
        >
          <h2>{student.name}</h2>

          <p>{student.departmentName}</p>

          <p>CGPA : {student.cgpa}</p>
        </div>
      ))}
    </div>
  );
}