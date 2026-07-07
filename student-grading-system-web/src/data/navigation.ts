import {
    LayoutDashboard,
    GraduationCap,
    Users,
    Building2,
    BookOpen,
    CalendarCheck,
    BarChart3,
    Settings
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Students",
        path: "/students",
        icon: GraduationCap,
    },
    {
        title: "Faculty",
        path: "/faculty",
        icon: Users,
    },
    {
        title: "Departments",
        path: "/departments",
        icon: Building2,
    },
    {
        title: "Subjects",
        path: "/subjects",
        icon: BookOpen,
    },
    {
        title: "Attendance",
        path: "/attendance",
        icon: CalendarCheck,
    },
    {
        title: "Results",
        path: "/results",
        icon: BarChart3,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    },
];