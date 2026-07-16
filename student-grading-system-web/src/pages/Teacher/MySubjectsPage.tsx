import { useMySubjects } from "@/hooks/useMySubjects";

export default function MySubjectsPage() {
  const { data, isLoading } = useMySubjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        My Subjects
      </h1>

      {data?.map((subject) => (
        <div
          key={subject.id}
          className="rounded-lg border p-4"
        >
          <h2 className="font-semibold">
            {subject.name}
          </h2>

          <p>{subject.subjectCode}</p>

          <p>
            Semester {subject.semester}
          </p>

          <p>
            Credits {subject.credits}
          </p>

          <p>
            {subject.departmentName}
          </p>
        </div>
      ))}
    </div>
  );
}