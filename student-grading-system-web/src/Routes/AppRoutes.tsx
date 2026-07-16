import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";

import StudentPage from "@/pages/Students/StudentPage";
import FacultyPage from "../pages/Faculty/FacultyPage";
import DepartmentPage from "../pages/Departments/DepartmentPage";
import SubjectPage from "../pages/Subjects/SubjectPage";
import LoginPage from "@/pages/Auth/LoginPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TeacherDashboardPage from "@/pages/Teacher/DashboardPage";
import StudentDashboardPage from "@/pages/StudentPortal/DashboardPage";
import RoleRoute from "@/components/auth/RoleRoute";
import TeacherLayout from "@/layouts/TeacherLayout";
import StudentLayout from "@/layouts/StudentLayout";
import MySubjectsPage from "@/pages/Teacher/MySubjectsPage";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
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
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="students" element={<StudentPage />} />

          <Route path="faculty" element={<FacultyPage />} />

          <Route path="departments" element={<DepartmentPage />} />

          <Route path="subjects" element={<SubjectPage />} />
        </Route>

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
          <Route path="dashboard" element={<TeacherDashboardPage />} />

          <Route path="subjects" element={<MySubjectsPage />} />
        </Route>

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
          <Route path="dashboard" element={<StudentDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
