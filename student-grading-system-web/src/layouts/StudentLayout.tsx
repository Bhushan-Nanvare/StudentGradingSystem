import { NavLink, Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-white p-5">
        <h2 className="mb-6 text-2xl font-bold">
          Student Portal
        </h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/student/dashboard"
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
            to="/student/subjects"
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

          <NavLink
            to="/student/attendance"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Attendance
          </NavLink>

          <NavLink
            to="/student/marks"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Marks
          </NavLink>

          <NavLink
            to="/student/assignments"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Assignments
          </NavLink>

          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `rounded-md px-4 py-2 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}