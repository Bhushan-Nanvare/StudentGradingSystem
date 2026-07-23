export interface StudentReport {
  studentId: number;
  studentName: string;
  attendancePercentage: number;
  cia1: number;
  cia2: number;
  assignment: number;
  total: number;
}

export interface FacultyReport {
  facultyId: number;
  employeeCode: string;
  facultyName: string;
  departmentName: string;
  designation: string;
  assignedSubjectsCount: number;
  totalStudentsTaught: number;
}

export interface DepartmentReport {
  departmentId: number;
  departmentCode: string;
  departmentName: string;
  facultyCount: number;
  studentCount: number;
  subjectCount: number;
}

export interface AttendanceReport {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  averageAttendancePercentage: number;
}

export interface MarksReport {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  averageMarks: number;
  highestMarks: number;
  lowestMarks: number;
  passPercentage: number;
}

export interface SubjectReport {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  departmentName: string;
  facultyName: string;
  enrolledStudentsCount: number;
  credits: number;
  semester: number;
}