import { useFacultyDashboard } from "@/hooks/useFacultyDashboard";
import StatsCard from "@/components/common/StatsCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import { BookOpen, Users, Calendar, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TeacherDashboardPage() {
  const { username } = useAuth();
  const { data, isLoading, isError, refetch } = useFacultyDashboard();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorCard onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, Prof. {data.facultyName || username} 👋
        </h1>
        <p className="mt-2 text-slate-500">
          {data.departmentName} Department
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
          value={data.totalStudentsTaught} 
          icon={Users} 
        />
        <StatsCard 
          title="Upcoming Classes" 
          value={data.upcomingClassesCount} 
          icon={Calendar} 
        />
        <StatsCard 
          title="Department" 
          value={data.departmentName.substring(0, 3).toUpperCase()} 
          icon={GraduationCap} 
        />
      </div>
      
      {/* TODO: Add a schedule or recent submissions list here if needed */}
    </div>
  );
}