import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;