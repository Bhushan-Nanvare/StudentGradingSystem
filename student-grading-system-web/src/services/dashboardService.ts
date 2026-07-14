import axios from "axios";
import type { DashboardStats } from "@/types/dashboard";

const api = axios.create({
  baseURL: "http://localhost:5095/api",
});

export const getDashboardStatistics =
  async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard");

    return response.data.data;
  };