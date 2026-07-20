import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAttendance } from "@/hooks/useAttendance";
import { useMarkAttendance } from "@/hooks/useMarkAttendance";
import { Button } from "@/components/ui/button";

export default function AttendanceTab() {
  const { subjectId } = useParams();

  const { data: attendance, isLoading } = useAttendance(Number(subjectId));

  const [attendanceState, setAttendanceState] = useState<
    Record<number, boolean>
  >({});

  const mutation = useMarkAttendance();

  const toggleAttendance = (id: number, checked: boolean) => {
    setAttendanceState((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const saveAttendance = () => {
    mutation.mutate({
      subjectId: Number(subjectId),
      students:
        attendance?.map((student) => ({
          studentId: student.studentId,
          isPresent: attendanceState[student.studentId] ?? student.isPresent,
        })) ?? [],
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Attendance</h1>

      <div className="space-y-3">
        {attendance?.map((student) => (
          <div
            key={student.studentId}
            className="flex items-center justify-between rounded border p-3"
          >
            <div className="font-medium">{student.studentName}</div>

            <input
              type="checkbox"
              checked={attendanceState[student.studentId] ?? student.isPresent}
              onChange={(e) =>
                toggleAttendance(student.studentId, e.target.checked)
              }
            />
          </div>
        ))}
      </div>

      <Button onClick={saveAttendance} disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Attendance"}
      </Button>
    </div>
  );
}
