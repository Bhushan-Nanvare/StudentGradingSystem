import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  CalendarCheck,
  BarChart3,
  ClipboardList,
  User,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    path: "/admin/students",
    icon: GraduationCap,
  },
  {
    title: "Faculty",
    path: "/admin/faculty",
    icon: Users,
  },
  {
    title: "Departments",
    path: "/admin/departments",
    icon: Building2,
  },
  {
    title: "Subjects",
    path: "/admin/subjects",
    icon: BookOpen,
  },
];

export const teacherNavigation = [
  {
    title: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Subjects",
    path: "/teacher/subjects",
    icon: BookOpen,
  },
];

export const studentNavigation = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Subjects",
    path: "/student/subjects",
    icon: BookOpen,
  },
  {
    title: "Attendance",
    path: "/student/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Marks",
    path: "/student/marks",
    icon: BarChart3,
  },
  {
    title: "Assignments",
    path: "/student/assignments",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: "/student/profile",
    icon: User,
  },
];