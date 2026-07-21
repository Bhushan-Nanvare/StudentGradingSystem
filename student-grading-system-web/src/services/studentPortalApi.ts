import api from "@/lib/axios";
import type {
    StudentAssignment,
    StudentAttendance,
    StudentDashboard,
    StudentMark,
    StudentProfile,
    StudentSubject,
} from "@/types/studentPortal";

export const getDashboard = async () => {
    const res = await api.get<StudentDashboard>(
        "/student-portal/dashboard"
    );

    return res.data;
};

export const getProfile = async () => {
    const res = await api.get<StudentProfile>(
        "/student-portal/profile"
    );

    return res.data;
};

export const getSubjects = async () => {
    const res = await api.get<StudentSubject[]>(
        "/student-portal/subjects"
    );

    return res.data;
};

export const getAttendance = async () => {
    const res = await api.get<StudentAttendance[]>(
        "/student-portal/attendance"
    );

    return res.data;
};

export const getMarks = async () => {
    const res = await api.get<StudentMark[]>(
        "/student-portal/marks"
    );

    return res.data;
};

export const getAssignments = async () => {
    const res = await api.get<StudentAssignment[]>(
        "/student-portal/assignments"
    );

    return res.data;
};