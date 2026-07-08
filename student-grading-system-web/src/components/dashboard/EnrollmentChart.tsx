
// NOTE:
// These values are intentionally hardcoded during the UI development phase.
// They will be populated from the Dashboard API after frontend-backend integration.
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const chartData = [
  { month: "Jan", students: 320 },
  { month: "Feb", students: 410 },
  { month: "Mar", students: 520 },
  { month: "Apr", students: 610 },
  { month: "May", students: 700 },
  { month: "Jun", students: 840 },
];

function EnrollmentChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Student Enrollment
      </h2>

      <div className="h-72">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default EnrollmentChart;