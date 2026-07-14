import api from "@/lib/axios";

import type {
  LoginRequest,
  AuthResponse,
} from "@/types/auth";

export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data.data;
};