import { useParams } from "react-router-dom";

export default function AttendancePage() {
  const { subjectId } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Attendance
      </h1>

      <p>
        Subject Id : {subjectId}
      </p>
    </div>
  );
}