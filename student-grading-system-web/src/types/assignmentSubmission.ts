export interface AssignmentSubmission {
  id: number;
  assignmentId: number;
  studentId: number;
  studentName: string;
  filePath: string;
  submittedAt: string;
  marks?: number;
  remarks: string;
  status: string;
}