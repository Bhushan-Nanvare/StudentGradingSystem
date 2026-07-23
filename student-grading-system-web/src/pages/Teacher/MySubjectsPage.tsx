import { useMySubjects } from "@/hooks/useMySubjects";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { BookOpen } from "lucide-react";

export default function MySubjectsPage() {
  const { data, isLoading } = useMySubjects();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Assigned Subjects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((subject) => (
          <div
            key={subject.id}
            className="rounded-xl border bg-white shadow-sm overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-md hover:border-blue-300 group"
            onClick={() => navigate(`/teacher/subjects/${subject.id}`)}
          >
            <div className="bg-slate-50 p-6 border-b group-hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {subject.subjectCode}
                </span>
                <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border">
                  Semester {subject.semester}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 line-clamp-1">{subject.name}</h2>
              <p className="text-sm text-slate-500 mt-1">{subject.departmentName}</p>
            </div>
            
            <div className="p-4 bg-white flex justify-between items-center text-sm text-slate-600 mt-auto">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>{subject.credits} Credits</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 font-medium group-hover:underline">
                Manage Workspace &rarr;
              </div>
            </div>
          </div>
        ))}

        {data?.length === 0 && (
          <div className="col-span-full bg-slate-50 border border-dashed rounded-xl p-12 text-center">
            <h3 className="text-lg font-medium text-slate-900 mb-1">No Subjects Assigned</h3>
            <p className="text-slate-500">You have not been assigned any subjects for the current semester.</p>
          </div>
        )}
      </div>
    </div>
  );
}
