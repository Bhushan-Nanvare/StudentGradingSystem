import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5095/api",
});

export const getDashboardStatistics = async () => {
  const response = await api.get("/dashboard");

  return response.data.data;
};