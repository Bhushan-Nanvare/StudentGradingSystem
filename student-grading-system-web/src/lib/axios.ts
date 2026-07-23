import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://localhost:5095/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        toast.error("You don't have permission to perform this action.");
      } else if (error.response.status >= 500) {
        toast.error("An unexpected server error occurred.");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }
    
    return Promise.reject(error);
  }
);

export default api;