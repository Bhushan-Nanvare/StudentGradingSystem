import { NavLink, Outlet } from "react-router-dom";

export default function TeacherLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-5">
        <h2 className="mb-6 text-2xl font-bold">
          Teacher Portal
        </h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/teacher/dashboard"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/teacher/subjects"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            My Subjects
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}