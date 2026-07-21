export interface Department {
  id: number;
  departmentCode: string;
  name: string;
}

export interface CreateDepartmentRequest {
  name: string;
  departmentCode?: string;
}

export interface UpdateDepartmentRequest {
  name: string;
  departmentCode?: string;
}