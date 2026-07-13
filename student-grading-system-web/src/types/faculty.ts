export interface Faculty {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: number;
  departmentName: string;
}

export interface CreateFacultyRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: number;
}

export interface UpdateFacultyRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  salary: number;
  joiningDate: string;
  departmentId: number;
}