import api from "@/lib/axios";

export interface Department {
  id: number;
  name: string;
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments");

  return response.data.data;
};