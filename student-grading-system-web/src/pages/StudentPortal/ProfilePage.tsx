import { useStudentProfile } from "@/hooks/useStudentPortal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorCard from "@/components/common/ErrorCard";
import { User, Mail, GraduationCap, Building2, Hash, Calendar } from "lucide-react";

const infoFields = [
  { key: "rollNumber", label: "Roll Number", icon: Hash },
  { key: "department", label: "Department", icon: Building2 },
  { key: "email", label: "Email", icon: Mail },
  { key: "age", label: "Age", icon: Calendar },
  { key: "cgpa", label: "CGPA", icon: GraduationCap },
] as const;

export default function ProfilePage() {
  const { data, isLoading, isError, refetch } = useStudentProfile();

  if (isLoading) return <LoadingSpinner />;
  if (isError || !data) return <ErrorCard onRetry={refetch} />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white">
              <User className="h-10 w-10" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="mt-1 text-blue-100">{data.rollNumber} &middot; {data.department}</p>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="p-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoFields.map((field) => {
              const Icon = field.icon;
              const value = data[field.key];
              return (
                <div key={field.key} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {field.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-800">
                      {field.key === "cgpa" ? Number(value).toFixed(2) : value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}