import { useParams } from "react-router-dom";
import { useReports } from "@/hooks/useReports";

export default function ReportsTab() {
  const { subjectId } = useParams();

  const {
    data: reports,
    isLoading,
    isError,
  } = useReports(Number(subjectId));

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        Loading reports...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 py-10">
        Failed to load reports.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Subject Report
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">
                Student
              </th>

              <th className="border p-3">
                Attendance %
              </th>

              <th className="border p-3">
                CIA 1
              </th>

              <th className="border p-3">
                CIA 2
              </th>

              <th className="border p-3">
                Assignment
              </th>

              <th className="border p-3">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {reports?.length ? (
              reports.map((student) => (
                <tr
                  key={student.studentId}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {student.studentName}
                  </td>

                  <td className="border p-3 text-center">
                    {student.attendancePercentage.toFixed(2)}%
                  </td>

                  <td className="border p-3 text-center">
                    {student.cia1}
                  </td>

                  <td className="border p-3 text-center">
                    {student.cia2}
                  </td>

                  <td className="border p-3 text-center">
                    {student.assignment}
                  </td>

                  <td className="border p-3 text-center font-semibold">
                    {student.total}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-6"
                >
                  No report data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}