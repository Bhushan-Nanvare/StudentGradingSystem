function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold">
          B
        </div>

      </div>

    </header>
  );
}

export default Navbar;