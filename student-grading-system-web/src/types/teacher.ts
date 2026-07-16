export interface TeacherSubject {
  id: number;
  subjectCode: string;
  name: string;
  credits: number;
  semester: number;
  departmentName: string;
}

export interface TeacherStudent {
  id: number;
  name: string;
  departmentName: string;
  cgpa: number;
}