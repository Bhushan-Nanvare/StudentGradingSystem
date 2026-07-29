export interface AttendanceStats {
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  overallAttendancePercentage: number;
}

export interface MarksStats {
  totalMarksEntries: number;
  averageMarks: number;
  highestMarks: number;
  lowestMarks: number;
}

export interface RecentActivity {
  activityType: string;
  description: string;
  timestamp: string;
}

export interface DashboardStats {
  studentCount: number;
  facultyCount: number;
  departmentCount: number;
  subjectCount: number;
  assignmentCount: number;
  attendanceStats: AttendanceStats;
  marksStats: MarksStats;
  recentActivities: RecentActivity[];
}
