import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";

import StudentPage from "@/pages/Students/StudentPage";
import FacultyPage from "../pages/Faculty/FacultyPage";
import DepartmentPage from "../pages/Departments/DepartmentPage";
import SubjectPage from "../pages/Subjects/SubjectPage";
import LoginPage from "@/pages/Auth/LoginPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />

          <Route path="students" element={<StudentPage />} />

          <Route path="faculty" element={<FacultyPage />} />

          <Route path="departments" element={<DepartmentPage />} />

          <Route path="subjects" element={<SubjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
