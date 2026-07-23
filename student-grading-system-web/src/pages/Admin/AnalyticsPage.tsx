import { useOverallAnalytics } from "@/hooks/useAnalytics";
import StatsCard from "@/components/common/StatsCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import { GraduationCap, Percent, ArrowUp, ArrowDown, Users, BookOpen, CheckCircle } from "lucide-react";

export default function AnalyticsPage() {
  const { data, isLoading, isError, refetch } = useOverallAnalytics();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorCard onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Overall Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Students" 
          value={data.totalStudents} 
          icon={Users} 
        />
        <StatsCard 
          title="Total Subjects" 
          value={data.totalSubjects} 
          icon={BookOpen} 
        />
        <StatsCard 
          title="Overall Attendance" 
          value={`${data.overallAttendancePercentage.toFixed(1)}%`} 
          icon={Percent} 
        />
        <StatsCard 
          title="Pass Percentage" 
          value={`${data.passPercentage.toFixed(1)}%`} 
          icon={CheckCircle} 
        />
        <StatsCard 
          title="Average Marks" 
          value={data.averageMarks.toFixed(1)} 
          icon={GraduationCap} 
        />
        <StatsCard 
          title="Highest Marks" 
          value={data.highestMarks.toFixed(1)} 
          icon={ArrowUp} 
        />
        <StatsCard 
          title="Lowest Marks" 
          value={data.lowestMarks.toFixed(1)} 
          icon={ArrowDown} 
        />
      </div>
      
      {/* TODO: Add Department & Subject specific analytics charts below using re-charts if needed later */}
    </div>
  );
}
