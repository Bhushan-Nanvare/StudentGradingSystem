import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-8">

          <div className="rounded-xl bg-white p-8 shadow-sm">

            Dashboard Content

          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;