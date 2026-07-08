// NOTE:
// These values are intentionally hardcoded during the UI development phase.
// They will be populated from the Dashboard API after frontend-backend integration.

const stats = [
  {
    title: "Students",
    value: "1,250",
    color: "bg-blue-500",
  },
  {
    title: "Faculty",
    value: "82",
    color: "bg-green-500",
  },
  {
    title: "Departments",
    value: "12",
    color: "bg-orange-500",
  },
  {
    title: "Subjects",
    value: "48",
    color: "bg-purple-500",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200"
        >

          <div
            className={`mb-4 h-3 w-16 rounded-full ${stat.color}`}
          />

          <h3 className="text-slate-500 text-sm">
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