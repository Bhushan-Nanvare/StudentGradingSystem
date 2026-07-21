import { useStudentDashboard } from "@/hooks/useStudentPortal";

export default function DashboardPage() {
  const { data, isLoading } = useStudentDashboard();

  if (isLoading) {
    return <div className="text-lg">Loading...</div>;
  }

  if (!data) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {data.studentName}
        </h1>

        <p className="text-gray-500 mt-2">
          Roll Number : {data.rollNumber}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="CGPA"
          value={data.cgpa.toFixed(2)}
        />

        <Card
          title="Attendance"
          value={`${data.attendancePercentage}%`}
        />

        <Card
          title="Subjects"
          value={data.totalSubjects}
        />

        <Card
          title="Pending Assignments"
          value={data.pendingAssignments}
        />
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <div className="mt-4 text-3xl font-bold">
        {value}
      </div>
    </div>
  );
}