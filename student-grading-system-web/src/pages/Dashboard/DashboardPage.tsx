import StatsCards from "@/components/dashboard/StatsCards";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/context/AuthContext";

function DashboardPage() {
  const { username } = useAuth();

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
          <EnrollmentChart />
        </div>

        <RecentActivity />

      </div>

    </div>
  );
}

export default DashboardPage;