import api from "@/lib/axios";
import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "@/types/department";


export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments");

  return response.data.data;
};

export const getDepartmentById = async (
  id: number
): Promise<Department> => {
  const response = await api.get(`/departments/${id}`);

  return response.data.data;
};

export const createDepartment = async (
  department: CreateDepartmentRequest
): Promise<Department> => {
  const response = await api.post(
    "/departments",
    department
  );

  return response.data.data;
};

export const updateDepartment = async (
  id: number,
  department: UpdateDepartmentRequest
): Promise<Department> => {
  const response = await api.put(
    `/departments/${id}`,
    department
  );

  return response.data.data;
};

export const deleteDepartment = async (
  id: number
): Promise<void> => {
  await api.delete(`/departments/${id}`);
};