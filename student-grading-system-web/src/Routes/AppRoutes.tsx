import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import TeacherLayout from "@/layouts/TeacherLayout";
import StudentLayout from "@/layouts/StudentLayout";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleRoute from "@/components/auth/RoleRoute";

import LoginPage from "@/pages/Auth/LoginPage";

import DashboardPage from "@/pages/Dashboard/DashboardPage";

import StudentPage from "@/pages/Students/StudentPage";
import FacultyPage from "@/pages/Faculty/FacultyPage";
import DepartmentPage from "@/pages/Departments/DepartmentPage";
import SubjectPage from "@/pages/Subjects/SubjectPage";

import TeacherDashboardPage from "@/pages/Teacher/DashboardPage";
import MySubjectsPage from "@/pages/Teacher/MySubjectsPage";

import SubjectWorkspaceLayout from "@/pages/Teacher/SubjectWorkspace/SubjectWorkspaceLayout";
import StudentsTab from "@/pages/Teacher/SubjectWorkspace/StudentsTab";
import AttendanceTab from "@/pages/Teacher/SubjectWorkspace/AttendanceTab";
import MarksTab from "@/pages/Teacher/SubjectWorkspace/MarksTab";
import AssignmentsTab from "@/pages/Teacher/SubjectWorkspace/AssignmentsTab";
import ReportsTab from "@/pages/Teacher/SubjectWorkspace/ReportsTab";

import StudentDashboardPage from "@/pages/StudentPortal/DashboardPage";
import SubjectsPage from "@/pages/StudentPortal/SubjectsPage";
import AttendancePage from "@/pages/StudentPortal/AttendancePage";
import MarksPage from "@/pages/StudentPortal/MarksPage";
import AssignmentsPage from "@/pages/StudentPortal/AssignmentsPage";
import ProfilePage from "@/pages/StudentPortal/ProfilePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Admin"]}>
                <DashboardLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="students"
            element={<StudentPage />}
          />

          <Route
            path="faculty"
            element={<FacultyPage />}
          />

          <Route
            path="departments"
            element={<DepartmentPage />}
          />

          <Route
            path="subjects"
            element={<SubjectPage />}
          />
        </Route>

        {/* ================= TEACHER ================= */}

        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Faculty"]}>
                <TeacherLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<TeacherDashboardPage />}
          />

          <Route
            path="subjects"
            element={<MySubjectsPage />}
          />

          <Route
            path="subjects/:subjectId"
            element={<SubjectWorkspaceLayout />}
          >
            <Route
              index
              element={<Navigate to="students" replace />}
            />

            <Route
              path="students"
              element={<StudentsTab />}
            />

            <Route
              path="attendance"
              element={<AttendanceTab />}
            />

            <Route
              path="marks"
              element={<MarksTab />}
            />

            <Route
              path="assignments"
              element={<AssignmentsTab />}
            />

            <Route
              path="reports"
              element={<ReportsTab />}
            />
          </Route>
        </Route>

        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["Student"]}>
                <StudentLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<StudentDashboardPage />}
          />

          <Route
            path="subjects"
            element={<SubjectsPage />}
          />

          <Route
            path="attendance"
            element={<AttendancePage />}
          />

          <Route
            path="marks"
            element={<MarksPage />}
          />

          <Route
            path="assignments"
            element={<AssignmentsPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;