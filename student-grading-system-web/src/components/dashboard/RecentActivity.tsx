// NOTE:
// These values are intentionally hardcoded during the UI development phase.
// They will be populated from the Dashboard API after frontend-backend integration.
const activities = [
  {
    title: "New student registered",
    time: "5 minutes ago",
  },
  {
    title: "Faculty profile updated",
    time: "20 minutes ago",
  },
  {
    title: "Department created",
    time: "1 hour ago",
  },
  {
    title: "Subject assigned",
    time: "2 hours ago",
  },
];

function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((activity) => (

          <div
            key={activity.title}
            className="border-b border-slate-100 pb-4 last:border-none"
          >

            <p className="font-medium">
              {activity.title}
            </p>

            <p className="text-sm text-slate-500">
              {activity.time}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;