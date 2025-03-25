// api/services/auth.ts
import axiosInstance from "../axios";
import { ENDPOINTS } from "../endpoints";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, payload);
  return response.data;
};

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, payload);
  return response.data;
};
