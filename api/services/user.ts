// api/services/user.ts
import axiosInstance from "../axios";
import { ENDPOINTS } from "../endpoints";

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get(ENDPOINTS.USER.GET_PROFILE);
  return response.data;
};

export const updateUserProfile = async (
  payload: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await axiosInstance.put(
    ENDPOINTS.USER.UPDATE_PROFILE,
    payload
  );
  return response.data;
};
