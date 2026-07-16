import { NavLink, Outlet, useParams } from "react-router-dom";

export default function SubjectWorkspaceLayout() {
  const { subjectId } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Subject Workspace
      </h1>

      <div className="flex gap-3 border-b pb-3">
        <NavLink to={`/teacher/subjects/${subjectId}/students`}>
          Students
        </NavLink>

        <NavLink to={`/teacher/subjects/${subjectId}/attendance`}>
          Attendance
        </NavLink>

        <NavLink to={`/teacher/subjects/${subjectId}/marks`}>
          Marks
        </NavLink>

        <NavLink to={`/teacher/subjects/${subjectId}/assignments`}>
          Assignments
        </NavLink>

        <NavLink to={`/teacher/subjects/${subjectId}/reports`}>
          Reports
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}