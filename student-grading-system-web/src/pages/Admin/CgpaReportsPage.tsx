import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { useStudentCgpa, useRecalculateCgpa } from "@/hooks/useCgpa";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { BookOpen, AlertTriangle } from "lucide-react";

export default function CgpaReportsPage() {
  const [studentId, setStudentId] = useState<string>("");
  const [searchId, setSearchId] = useState<number | null>(null);

  const { data: cgpaData, isLoading, isError } = useStudentCgpa(searchId as number);
  const recalculateMutation = useRecalculateCgpa();

  const handleSearch = () => {
    const id = parseInt(studentId, 10);
    if (!isNaN(id)) {
      setSearchId(id);
    }
  };

  const handleRecalculate = () => {
    if (searchId) {
      recalculateMutation.mutate(searchId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">CGPA Management</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full max-w-sm">
          <label className="block text-sm font-medium mb-2">Search Student by ID</label>
          <SearchBar 
            value={studentId} 
            onChange={setStudentId} 
            placeholder="Enter Student ID (e.g. 1)" 
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} disabled={!studentId}>
          Lookup CGPA
        </Button>
      </div>

      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 mt-0.5" />
          <div>
            <h4 className="font-semibold">Student not found</h4>
            <p className="text-sm">Could not retrieve CGPA data for the provided student ID.</p>
          </div>
        </div>
      )}

      {cgpaData && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{cgpaData.studentName}</h2>
              <p className="text-sm text-slate-500">Roll No: {cgpaData.rollNumber} | {cgpaData.departmentName}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider">Overall CGPA</p>
                <p className="text-3xl font-bold text-blue-600">{cgpaData.overallCGPA.toFixed(2)}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRecalculate}
                disabled={recalculateMutation.isPending}
              >
                {recalculateMutation.isPending ? "Calculating..." : "Recalculate"}
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              Semester Performance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cgpaData.semesterGPAs.map((sem) => (
                <div key={sem.semester} className="border rounded-lg p-4 bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Semester {sem.semester}</h4>
                    <p className="text-sm text-slate-500">{sem.totalCredits} Credits</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold">GPA</p>
                    <p className="text-xl font-bold">{sem.gpa.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
