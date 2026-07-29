export interface OverallAnalytics {
  overallAttendancePercentage: number;
  averageMarks: number;
  highestMarks: number;
  lowestMarks: number;
  passPercentage: number;
  totalStudents: number;
  totalSubjects: number;
}

export interface DepartmentAnalytics {
  departmentId: number;
  departmentName: string;
  totalStudents: number;
  averageCGPA: number;
  attendancePercentage: number;
  passPercentage: number;
}

export interface SubjectAnalytics {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  enrolledStudents: number;
  averageMarks: number;
  highestMarks: number;
  lowestMarks: number;
  attendancePercentage: number;
  passPercentage: number;
}
