export interface Attendance {
  studentId: number;
  studentName: string;
  isPresent: boolean;
  date: string;
}

export interface MarkAttendanceRequest {
  studentId: number;
  subjectId: number;
  isPresent: boolean;
}