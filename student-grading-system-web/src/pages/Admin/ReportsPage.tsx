import { useState } from "react";

import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState<"students" | "faculty" | "departments">("students");

  // In a real implementation, we would fetch data based on reportType
  // For now, we will show a placeholder UI as requested in the plan until we implement all report hooks.
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">System Reports</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          <Button 
            variant={reportType === "students" ? "default" : "outline"} 
            onClick={() => setReportType("students")}
          >
            Student Reports
          </Button>
          <Button 
            variant={reportType === "faculty" ? "default" : "outline"} 
            onClick={() => setReportType("faculty")}
          >
            Faculty Reports
          </Button>
          <Button 
            variant={reportType === "departments" ? "default" : "outline"} 
            onClick={() => setReportType("departments")}
          >
            Department Reports
          </Button>
        </div>
        
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder={`Search ${reportType}...`} 
        />
      </div>

      <div className="bg-white rounded-lg border p-12 text-center text-slate-500 shadow-sm">
        <h3 className="text-lg font-medium text-slate-900 mb-2">Detailed Reports Coming Soon</h3>
        <p>The backend APIs for {reportType} reports are ready. Integration will be completed in the next phase.</p>
      </div>
    </div>
  );
}
