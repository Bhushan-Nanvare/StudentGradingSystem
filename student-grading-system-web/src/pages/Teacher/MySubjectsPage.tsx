import { useMySubjects } from "@/hooks/useMySubjects";
import { useNavigate } from "react-router-dom";

export default function MySubjectsPage() {
  const { data, isLoading } = useMySubjects();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Subjects</h1>

      {data?.map((subject) => (
        <div
          key={subject.id}
          className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/teacher/subjects/${subject.id}`)}
        >
          <h2 className="font-semibold">{subject.name}</h2>

          <p>{subject.subjectCode}</p>

          <p>Semester {subject.semester}</p>

          <p>Credits {subject.credits}</p>

          <p>{subject.departmentName}</p>
        </div>
      ))}
    </div>
  );
}
