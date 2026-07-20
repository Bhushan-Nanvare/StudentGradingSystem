import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useMarks } from "@/hooks/useMarks";
import { useSaveMarks } from "@/hooks/useSaveMarks";

export default function MarksTab() {
  const { subjectId } = useParams();

  const [assessmentType, setAssessmentType] = useState("CIA1");

  const { data: marks, isLoading } = useMarks(
    Number(subjectId),
    assessmentType,
  );

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
    setMarkState((prev) => ({
      ...prev,
      [studentId]: value,
    }));
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Marks</h1>

      <div className="flex gap-4">
        <select
          value={assessmentType}
          onChange={(e) => setAssessmentType(e.target.value)}
          className="rounded border p-2"
        >
          <option>CIA1</option>

          <option>CIA2</option>

          <option>Assignment</option>

          <option>Practical</option>

          <option>Final</option>
        </select>

        <input
          type="number"
          value={maxMarks}
          onChange={(e) => setMaxMarks(Number(e.target.value))}
          className="w-32 rounded border p-2"
          placeholder="Max Marks"
        />
      </div>

      <div className="space-y-3">
        {marks?.map((student) => (
          <div
            key={student.studentId}
            className="flex items-center justify-between rounded border p-3"
          >
            <div>
              <div className="font-medium">{student.studentName}</div>

              <div className="text-sm text-gray-500">Maximum : {maxMarks}</div>
            </div>

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
              className="w-24 rounded border p-2"
            />
          </div>
        ))}
      </div>

      <Button onClick={saveMarks} disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Marks"}
      </Button>
    </div>
  );
}
