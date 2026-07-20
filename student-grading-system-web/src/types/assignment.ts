export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  subjectName: string;
  createdAt: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  subjectId: number;
  dueDate: string;
  maxMarks: number;
}

export interface UpdateAssignmentRequest {
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
}