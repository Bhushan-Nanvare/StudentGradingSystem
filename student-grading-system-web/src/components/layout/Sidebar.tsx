import {
  adminNavigation,
  teacherNavigation,
  studentNavigation,
} from "@/data/navigation";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Sidebar() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const navigation =
    role === "Admin"
      ? adminNavigation
      : role === "Faculty"
      ? teacherNavigation
      : studentNavigation;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 text-white shadow-xl">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SGS ERP</h1>
            <p className="text-xs text-blue-400 font-medium tracking-wide uppercase">{role} Portal</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/10 text-blue-400 font-medium"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;