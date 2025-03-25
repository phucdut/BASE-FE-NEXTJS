// api/endpoints.ts
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USER: {
    GET_PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
  },
  // Thêm các endpoint khác nếu cần
} as const;
