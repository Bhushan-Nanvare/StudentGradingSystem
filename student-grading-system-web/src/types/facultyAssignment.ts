export interface FacultyAssignment {
  id: number;
  facultyId: number;
  facultyName: string;
  subjectId: number;
  subjectName: string;
}

export interface AssignSubjectRequest {
  facultyId: number;
  subjectId: number;
}