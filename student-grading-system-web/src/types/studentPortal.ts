export interface StudentDashboard {
  studentName: string;
  rollNumber: string;
  department: string;
  cgpa: number;
  totalSubjects: number;
  attendancePercentage: number;
  pendingAssignments: number;
}

export interface StudentProfile {
  id: number;
  name: string;
  rollNumber: string;
  email: string;
  age: number;
  cgpa: number;
  department: string;
}

export interface StudentSubject {
  id: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  semester: number;
  faculty: string;
}

export interface StudentAttendance {
  subject: string;
  totalClasses: number;
  presentClasses: number;
  percentage: number;
}

export interface StudentMark {
  subject: string;
  assessmentType: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
}

export interface StudentAssignment {
  assignmentId: number;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  maxMarks: number;
  submitted: boolean;
  marksObtained?: number;
}

