import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAssignments } from "@/hooks/useAssignments";
import { useCreateAssignment } from "@/hooks/useCreateAssignment";
import { useDeleteAssignment } from "@/hooks/useDeleteAssignment";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Plus, Trash2, Calendar, Award, ClipboardList } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AssignmentsTab() {
  const { subjectId } = useParams();
  const { data: assignments, isLoading } = useAssignments(Number(subjectId));
  const createMutation = useCreateAssignment();
  const deleteMutation = useDeleteAssignment();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [maxMarks, setMaxMarks] = useState(20);

  const createAssignment = () => {
    if (!title.trim()) return;
    createMutation.mutate(
      { title, description, subjectId: Number(subjectId), dueDate, maxMarks },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setDueDate("");
          setMaxMarks(20);
          setShowForm(false);
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Assignments</h2>
          <p className="text-sm text-slate-500">{assignments?.length ?? 0} total assignments</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Assignment
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-slate-800">Create New Assignment</h3>
          <input
            className="w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            placeholder="Assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            rows={3}
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-4">
            <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <input
                type="date"
                className="border-none bg-transparent text-sm outline-none"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
              <Award className="h-4 w-4 text-slate-400" />
              <input
                type="number"
                className="w-16 border-none bg-transparent text-sm outline-none"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value))}
                placeholder="Max"
              />
              <span className="text-xs text-slate-400">marks</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={createAssignment} disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create Assignment"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Assignment cards */}
      {assignments?.length === 0 ? (
        <EmptyState
          title="No Assignments Yet"
          description="Create your first assignment to get started."
          icon={<ClipboardList className="h-8 w-8 text-slate-400" />}
        />
      ) : (
        <div className="grid gap-4">
          {assignments?.map((assignment) => {
            const isPastDue = assignment.dueDate && new Date(assignment.dueDate) < new Date();
            return (
              <div
                key={assignment.id}
                className="rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-800">{assignment.title}</h3>
                      {isPastDue && (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Past Due
                        </span>
                      )}
                    </div>
                    {assignment.description && (
                      <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{assignment.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                      {assignment.dueDate && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Due {formatDate(assignment.dueDate)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5" />
                        {assignment.maxMarks} marks
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => deleteMutation.mutate(assignment.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
