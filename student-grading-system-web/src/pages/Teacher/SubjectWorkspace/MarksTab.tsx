import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMarks } from "@/hooks/useMarks";
import { useSaveMarks } from "@/hooks/useSaveMarks";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Save, BarChart3 } from "lucide-react";

const assessmentTypes = [
  { value: "CIA1", label: "CIA 1" },
  { value: "CIA2", label: "CIA 2" },
  { value: "Assignment", label: "Assignment" },
  { value: "Practical", label: "Practical" },
  { value: "Final", label: "Final Exam" },
];

export default function MarksTab() {
  const { subjectId } = useParams();
  const [assessmentType, setAssessmentType] = useState("CIA1");
  const { data: marks, isLoading } = useMarks(Number(subjectId), assessmentType);
  const mutation = useSaveMarks();
  const [maxMarks, setMaxMarks] = useState(25);
  const [markState, setMarkState] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!marks) return;
    const obj: Record<number, number> = {};
    marks.forEach((student) => {
      obj[student.studentId] = student.marksObtained;
    });
    setMarkState(obj);
    if (marks.length > 0) {
      setMaxMarks(marks[0].maxMarks || 25);
    }
  }, [marks]);

  const changeMark = (studentId: number, value: number) => {
    setMarkState((prev) => ({ ...prev, [studentId]: value }));
  };

  const saveMarks = () => {
    mutation.mutate({
      subjectId: Number(subjectId),
      assessmentType,
      maxMarks,
      students:
        marks?.map((student) => ({
          studentId: student.studentId,
          marksObtained: markState[student.studentId] ?? 0,
        })) ?? [],
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Enter Marks</h2>
          <p className="text-sm text-slate-500">
            {marks?.length ?? 0} students &middot; Max: {maxMarks} marks
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm">
            {assessmentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setAssessmentType(type.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  assessmentType === type.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(Number(e.target.value))}
              className="w-16 border-none outline-none bg-transparent text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {(!marks || marks.length === 0) ? (
        <EmptyState
          title="No Students Found"
          description="No students are enrolled in this subject."
        />
      ) : (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="divide-y">
            {marks.map((student, index) => {
              const obtained = markState[student.studentId] ?? 0;
              const percentage = maxMarks > 0 ? (obtained / maxMarks) * 100 : 0;
              return (
                <div key={student.studentId} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">{student.studentName}</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            percentage >= 75 ? "bg-emerald-500" :
                            percentage >= 50 ? "bg-amber-500" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={0}
                      max={maxMarks}
                      value={markState[student.studentId] ?? ""}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value < 0 || value > maxMarks) return;
                        changeMark(student.studentId, value);
                      }}
                      className="w-20 rounded-lg border bg-slate-50 px-3 py-2 text-center text-sm font-medium outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-xs text-slate-400 w-12">/ {maxMarks}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {marks && marks.length > 0 && (
        <Button onClick={saveMarks} disabled={mutation.isPending} className="gap-2">
          <Save className="h-4 w-4" />
          {mutation.isPending ? "Saving..." : "Save Marks"}
        </Button>
      )}
    </div>
  );
}
