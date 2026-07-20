export interface StudentAttendance {
  studentId: number;
  isPresent: boolean;
}

export interface MarkAttendanceRequest {
  subjectId: number;
  students: StudentAttendance[];
}

export interface AttendanceResponse {
  studentId: number;
  studentName: string;
  isPresent: boolean;
}