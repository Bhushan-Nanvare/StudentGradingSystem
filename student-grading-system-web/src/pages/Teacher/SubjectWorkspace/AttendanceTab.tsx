import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/useAttendance";
import { useMarkAttendance } from "@/hooks/useMarkAttendance";

type AttendanceStudent = {
  studentId: number;
  studentName: string;
  isPresent: boolean;
};

export default function AttendanceTab() {
  const { subjectId } = useParams();

  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data: attendance, isLoading } =
    useAttendance(Number(subjectId), date);

  const [attendanceState, setAttendanceState] =
    useState<Record<number, boolean>>({});

  const mutation = useMarkAttendance();

  const toggleAttendance = (
    id: number,
    checked: boolean
  ) => {
    setAttendanceState((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const saveAttendance = () => {
    mutation.mutate({
      subjectId: Number(subjectId),
      date,
      students:
        ((attendance as AttendanceStudent[] | undefined)?.map(
          (student) => ({
            studentId: student.studentId,
            isPresent:
              attendanceState[student.studentId] ??
              student.isPresent,
          })
        )) ?? [],
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Attendance
        </h1>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded border p-2"
          />
        </div>
      </div>

      <div className="space-y-3">
        {(attendance as AttendanceStudent[] | undefined)?.map(
          (student) => (
            <div
              key={student.studentId}
              className="flex items-center justify-between rounded border p-3"
            >
              <div className="font-medium">
                {student.studentName}
              </div>

              <input
                type="checkbox"
                checked={
                  attendanceState[student.studentId] ??
                  student.isPresent
                }
                onChange={(e) =>
                  toggleAttendance(
                    student.studentId,
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>
          )
        )}

        {(!attendance || (attendance as AttendanceStudent[]).length === 0) && (
          <div className="py-8 text-center text-gray-500 border rounded">
            No students found for this subject.
          </div>
        )}
      </div>

      <Button
        onClick={saveAttendance}
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Saving..."
          : "Save Attendance"}
      </Button>
    </div>
  );
}