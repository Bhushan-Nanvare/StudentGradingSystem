import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/useAttendance";
import { useMarkAttendance } from "@/hooks/useMarkAttendance";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { CalendarCheck, Save, CheckCircle, XCircle } from "lucide-react";

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

  const toggleAttendance = (id: number, checked: boolean) => {
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

  const students = (attendance as AttendanceStudent[] | undefined) ?? [];
  const presentCount = students.filter(
    (s) => attendanceState[s.studentId] ?? s.isPresent
  ).length;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Mark Attendance</h2>
          <p className="text-sm text-slate-500">
            {students.length > 0
              ? `${presentCount} of ${students.length} present`
              : "Select a date to view students"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm">
            <CalendarCheck className="h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm border-none outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <EmptyState
          title="No Students Found"
          description="No students are enrolled in this subject for the selected date."
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="divide-y">
            {students.map((student, index) => {
              const isPresent = attendanceState[student.studentId] ?? student.isPresent;
              return (
                <div
                  key={student.studentId}
                  className={`flex items-center justify-between px-5 py-4 transition-colors ${
                    isPresent ? "bg-white" : "bg-red-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600">
                      {index + 1}
                    </span>
                    <span className="font-medium text-slate-800">{student.studentName}</span>
                  </div>

                  <button
                    onClick={() => toggleAttendance(student.studentId, !isPresent)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isPresent
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-red-50 text-red-600 hover:bg-red-100"
                    }`}
                  >
                    {isPresent ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Present
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        Absent
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {students.length > 0 && (
        <Button
          onClick={saveAttendance}
          disabled={mutation.isPending}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {mutation.isPending ? "Saving..." : "Save Attendance"}
        </Button>
      )}
    </div>
  );
}