import { useStudentDashboard } from "@/hooks/useStudentPortal";
import StatsCard from "@/components/common/StatsCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import { GraduationCap, CalendarCheck, BookOpen, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "View Subjects", path: "/student/subjects", icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { label: "Attendance", path: "/student/attendance", icon: CalendarCheck, color: "bg-emerald-50 text-emerald-600" },
  { label: "My Marks", path: "/student/marks", icon: GraduationCap, color: "bg-violet-50 text-violet-600" },
  { label: "Assignments", path: "/student/assignments", icon: ClipboardList, color: "bg-amber-50 text-amber-600" },
];

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorCard onRetry={refetch} />;

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white shadow-lg shadow-blue-600/20">
        <h1 className="text-3xl font-bold">
          Welcome, {data.studentName} 👋
        </h1>
        <p className="mt-2 text-blue-100">
          Roll Number: {data.rollNumber} &middot; {data.department || "Department"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="CGPA"
          value={data.cgpa.toFixed(2)}
          icon={GraduationCap}
          description="Overall grade point"
        />
        <StatsCard
          title="Attendance"
          value={`${data.attendancePercentage}%`}
          icon={CalendarCheck}
          description={data.attendancePercentage >= 75 ? "Good standing" : "Below threshold"}
        />
        <StatsCard
          title="Subjects"
          value={data.totalSubjects}
          icon={BookOpen}
          description="Current semester"
        />
        <StatsCard
          title="Pending Assignments"
          value={data.pendingAssignments}
          icon={ClipboardList}
          description="Due assignments"
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex flex-col items-center gap-3 rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5"
              >
                <div className={`rounded-xl p-3 ${link.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-slate-700">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}