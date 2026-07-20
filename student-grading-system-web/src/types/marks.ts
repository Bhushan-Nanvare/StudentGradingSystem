export interface StudentMark {
  studentId: number;
  marksObtained: number;
}

export interface SaveMarksRequest {
  subjectId: number;
  assessmentType: string;
  maxMarks: number;
  students: StudentMark[];
}

export interface MarkResponse {
  studentId: number;
  studentName: string;
  marksObtained: number;
  maxMarks: number;
  assessmentType: string;
}