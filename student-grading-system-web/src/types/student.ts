export interface Student {
  id: number;
  name: string;
  age: number;
  departmentId: number;
  department: string | null;
  cgpa: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}