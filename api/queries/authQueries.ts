// api/queries/authQueries.ts
import { useMutation } from "@tanstack/react-query";

import { login, register } from "../services/auth";

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

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => login(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); // Lưu token
    },
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload) => register(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
