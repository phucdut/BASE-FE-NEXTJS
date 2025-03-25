// api/queries/userQueries.ts
import { useMutation, useQuery } from "@tanstack/react-query";

import { getUserProfile, updateUserProfile } from "../services/user";

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export const useUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!localStorage.getItem("token"), // Chỉ gọi API nếu có token
  });
};

export const useUpdateUserProfile = () => {
  return useMutation<UserProfile, Error, Partial<UserProfile>>({
    mutationFn: (payload) => updateUserProfile(payload),
    onSuccess: () => {
      // Invalidate query để refetch profile sau khi update
      // (Cần import queryClient từ nơi sử dụng nếu muốn invalidate)
    },
  });
};
