import { useStudentCgpa } from "@/hooks/useCgpa";
import { useStudentProfile } from "@/hooks/useStudentPortal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { BookOpen } from "lucide-react";

export default function CgpaPage() {
  const { data: profileData, isLoading: isProfileLoading } = useStudentProfile();
  
  const studentId = profileData?.id;

  const { data: cgpaData, isLoading: isCgpaLoading, isError } = useStudentCgpa(studentId || 0);

  if (isProfileLoading || isCgpaLoading) return <LoadingSpinner />;
  
  if (isError || !cgpaData) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold mb-2">Unavailable</h4>
        <p>Could not retrieve your CGPA data. It may not be calculated yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My CGPA</h1>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-8 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{cgpaData.studentName}</h2>
            <p className="text-blue-100 opacity-90 mt-1">Roll No: {cgpaData.rollNumber} | {cgpaData.departmentName}</p>
          </div>
          
          <div className="text-right bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <p className="text-xs text-blue-100 uppercase font-bold tracking-widest mb-1">Overall CGPA</p>
            <p className="text-4xl font-black">{cgpaData.overallCGPA.toFixed(2)}</p>
          </div>
        </div>

        <div className="p-8">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-6 text-slate-800">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Semester Performance
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cgpaData.semesterGPAs.map((sem) => (
              <div key={sem.semester} className="border rounded-xl p-5 bg-slate-50/50 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800">Semester {sem.semester}</h4>
                  <p className="text-sm text-slate-500 mt-1">{sem.totalCredits} Earned Credits</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-bold">GPA</p>
                  <p className="text-2xl font-bold text-slate-900">{sem.gpa.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
