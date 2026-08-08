import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, CalendarCheck, BarChart3, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { path: "students", label: "Students", icon: Users },
  { path: "attendance", label: "Attendance", icon: CalendarCheck },
  { path: "marks", label: "Marks", icon: BarChart3 },
  { path: "assignments", label: "Assignments", icon: ClipboardList },
  { path: "reports", label: "Reports", icon: FileText },
];

export default function SubjectWorkspaceLayout() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/teacher/subjects")}
          className="text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subject Workspace</h1>
          <p className="text-sm text-slate-500">Manage your subject's students, attendance, marks and assignments</p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border bg-white p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={`/teacher/subjects/${subjectId}/${tab.path}`}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </NavLink>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}