export interface Student {
  id: number;
  name: string;
  age: number;
  rollNumber: string;
  email: string;
  cgpa: number;
  departmentId: number;
  departmentName: string;
}

export interface CreateStudentRequest {
  name: string;
  age: number;
  rollNumber: string;
  email: string;
  cgpa: number;
  departmentId: number;
}

export interface UpdateStudentRequest {
  name: string;
  age: number;
  rollNumber: string;
  email: string;
  cgpa: number;
  departmentId: number;
}