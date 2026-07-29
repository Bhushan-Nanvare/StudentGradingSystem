import type { RecentActivity as RecentActivityItem } from "@/types/dashboard";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface RecentActivityProps {
  activities: RecentActivityItem[];
  isLoading?: boolean;
}

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>

      <div className="space-y-5">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={`${activity.timestamp}-${index}`}
              className="border-b border-slate-100 pb-4 last:border-none"
            >
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-slate-500">
                {activity.activityType} · {formatTimeAgo(activity.timestamp)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No recent activity.</p>
        )}
      </div>
    </div>
  );
}

export default RecentActivity;
