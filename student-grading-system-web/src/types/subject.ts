export interface Subject {
  id: number;
  subjectCode: string;
  name: string;
  credits: number;
  semester: number;
  departmentId: number;
  departmentName: string;
  facultyId: number;
  facultyName: string;
}

export interface CreateSubjectRequest {
  subjectCode: string;
  name: string;
  credits: number;
  semester: number;
  departmentId: number;
  facultyId: number;
}

export interface UpdateSubjectRequest {
  subjectCode: string;
  name: string;
  credits: number;
  semester: number;
  departmentId: number;
  facultyId: number;
}