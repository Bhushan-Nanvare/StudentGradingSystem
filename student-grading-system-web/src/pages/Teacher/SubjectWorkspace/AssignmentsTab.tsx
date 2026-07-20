import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useAssignments } from "@/hooks/useAssignments";
import { useCreateAssignment } from "@/hooks/useCreateAssignment";
import { useDeleteAssignment } from "@/hooks/useDeleteAssignment";

export default function AssignmentsTab() {
  const { subjectId } = useParams();

  const { data: assignments, isLoading } = useAssignments(Number(subjectId));

  const createMutation = useCreateAssignment();

  const deleteMutation = useDeleteAssignment();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [maxMarks, setMaxMarks] = useState(20);

  const createAssignment = () => {
    if (!title.trim()) return;

    createMutation.mutate({
      title,
      description,
      subjectId: Number(subjectId),
      dueDate,
      maxMarks,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setMaxMarks(20);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assignments</h1>

      <div className="rounded border p-4 space-y-4">
        <input
          className="w-full rounded border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full rounded border p-2"
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="date"
            className="rounded border p-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <input
            type="number"
            className="w-32 rounded border p-2"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
          />
        </div>

        <Button onClick={createAssignment} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Assignment"}
        </Button>
      </div>

      <div className="space-y-4">
        {assignments?.map((assignment) => (
          <div key={assignment.id} className="rounded border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{assignment.title}</h2>

                <p className="text-gray-500">{assignment.description}</p>
              </div>

              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(assignment.id)}
              >
                Delete
              </Button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>Due Date : {assignment.dueDate}</p>

              <p>Maximum Marks : {assignment.maxMarks}</p>
            </div>
          </div>
        ))}

        {assignments?.length === 0 && (
          <div className="rounded border p-6 text-center text-gray-500">
            No assignments created yet.
          </div>
        )}
      </div>
    </div>
  );
}
