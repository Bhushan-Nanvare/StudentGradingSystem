import StatsCards from "@/components/dashboard/StatsCards";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import { useDepartmentReports } from "@/hooks/useReports";

function DashboardPage() {
  const { username } = useAuth();
  const { data, isLoading } = useDashboard();
  const { data: departmentReports, isLoading: isDeptLoading } =
    useDepartmentReports();

  const enrollmentData =
    departmentReports?.map((dept) => ({
      name: dept.departmentName,
      students: dept.studentCount,
    })) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {username || "Admin"} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your university today.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <EnrollmentChart data={enrollmentData} isLoading={isDeptLoading} />
        </div>

        <RecentActivity
          activities={data?.recentActivities ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
