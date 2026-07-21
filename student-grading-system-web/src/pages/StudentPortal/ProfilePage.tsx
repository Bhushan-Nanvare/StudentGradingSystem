import { useStudentProfile } from "@/hooks/useStudentPortal";

export default function ProfilePage() {
  const { data, isLoading } = useStudentProfile();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No Profile Found</div>;

  return (
    <div className="max-w-3xl rounded-xl border bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <Info title="Name" value={data.name} />

        <Info title="Roll Number" value={data.rollNumber} />

        <Info title="Department" value={data.department} />

        <Info title="Email" value={data.email} />

        <Info title="Age" value={data.age} />

        <Info title="CGPA" value={data.cgpa} />

      </div>
    </div>
  );
}

type InfoProps = {
  title: string;
  value: string | number;
};

function Info({ title, value }: InfoProps) {
  return (
    <div>
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-1 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}