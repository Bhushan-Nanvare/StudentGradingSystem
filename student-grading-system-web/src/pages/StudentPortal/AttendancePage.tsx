import { useStudentAttendance } from "@/hooks/useStudentPortal";

export default function AttendancePage() {
  const { data, isLoading } = useStudentAttendance();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Attendance
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Total</th>
            <th className="border p-3">Present</th>
            <th className="border p-3">Percentage</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((attendance, index) => (
            <tr key={index}>
              <td className="border p-3">{attendance.subject}</td>
              <td className="border p-3">{attendance.totalClasses}</td>
              <td className="border p-3">{attendance.presentClasses}</td>
              <td className="border p-3">{attendance.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}