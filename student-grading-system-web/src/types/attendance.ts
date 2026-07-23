export interface StudentAttendance {
  studentId: number;
  isPresent: boolean;
}

export interface MarkAttendanceRequest {
  subjectId: number;
  date: string;
  students: StudentAttendance[];
}

export interface AttendanceResponse {
  studentId: number;
  studentName: string;
  isPresent: boolean;
}