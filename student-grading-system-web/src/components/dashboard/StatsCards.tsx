import { useDashboard } from "@/hooks/useDashboard";

function StatsCards() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-8 text-center text-red-600">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const stats = [
    {
      title: "Students",
      value: data.studentCount,
      color: "bg-blue-500",
    },
    {
      title: "Faculty",
      value: data.facultyCount,
      color: "bg-green-500",
    },
    {
      title: "Departments",
      value: data.departmentCount,
      color: "bg-orange-500",
    },
    {
      title: "Subjects",
      value: data.subjectCount,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            className={`mb-4 h-3 w-16 rounded-full ${stat.color}`}
          />

          <h3 className="text-sm text-slate-500">
            {stat.title}
          </h3>

          <p className="mt-2 text-4xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;