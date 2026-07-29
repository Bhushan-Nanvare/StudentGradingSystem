import { Link } from "react-router-dom";
import { useFacultyDashboard } from "@/hooks/useFacultyDashboard";
import { useFacultyRecentAssignments } from "@/hooks/useFacultyRecentAssignments";
import StatsCard from "@/components/common/StatsCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import EmptyState from "@/components/common/EmptyState";
import { BookOpen, Users, Calendar, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function formatDueDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TeacherDashboardPage() {
  const { username } = useAuth();
  const { data, isLoading, isError, refetch } = useFacultyDashboard();
  const {
    data: recentAssignments,
    isLoading: isAssignmentsLoading,
    isError: isAssignmentsError,
    refetch: refetchAssignments,
  } = useFacultyRecentAssignments();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorCard onRetry={refetch} />;

  const departmentLabel = data.department
    ? data.department.substring(0, 3).toUpperCase()
    : "N/A";

  const upcomingAssignments = (recentAssignments ?? []).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, Prof. {data.facultyName || username} 👋
        </h1>
        <p className="mt-2 text-slate-500">
          {data.department || "Unknown"} Department
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="My Subjects"
          value={data.totalSubjects}
          icon={BookOpen}
        />
        <StatsCard
          title="Total Students"
          value={data.totalStudents}
          icon={Users}
        />
        <StatsCard
          title="Total Assignments"
          value={data.totalAssignments}
          icon={Calendar}
        />
        <StatsCard
          title="Department"
          value={departmentLabel}
          icon={GraduationCap}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
          <Link
            to="/teacher/subjects"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all subjects
          </Link>
        </div>

        {isAssignmentsLoading ? (
          <div className="flex h-40 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : isAssignmentsError ? (
          <ErrorCard onRetry={refetchAssignments} />
        ) : upcomingAssignments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex flex-col gap-1 border-b border-slate-100 pb-4 last:border-none sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {assignment.title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {assignment.subjectCode} · {assignment.subjectName}
                  </p>
                </div>
                <div className="text-sm text-slate-600">
                  Due {formatDueDate(assignment.dueDate)} · {assignment.maxMarks}{" "}
                  marks
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No upcoming assignments"
            description="Create assignments from your subject workspace to see them here."
          />
        )}
      </div>
    </div>
  );
}
