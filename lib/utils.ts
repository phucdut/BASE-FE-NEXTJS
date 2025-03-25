import { type ClassValue, clsx } from "clsx";
import { Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { EntityError } from "./http";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleErrorApi = <TFieldValues extends Record<string, unknown>>({
  error,
  setError,
}: {
  error: unknown;
  setError?: UseFormSetError<TFieldValues>;
  duration?: number;
}) => {
  if (error instanceof EntityError) {
    if (setError) {
      error.payload.errors.forEach((item) => {
        setError(item.field as Path<TFieldValues>, {
          type: "server",
          message: item.detail || item.message || item.error_message,
        });
      });
    } else {
      toast.error(error.payload.errors.map((err) => err.message).join(", "));
    }
  } else {
    const err = error as { payload?: { message?: string } };
    toast.error(err?.payload?.message || "An error occurred");
  }
};

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

// Helper functions for authentication storage

/**
 * Saves authentication data based on "Remember Me" preference
 */
export function saveAuthData(
  token: string,
  expiresAt: string,
  email: string,
  rememberMe: boolean
) {
  // Choose storage type based on remember me
  const storage = rememberMe ? localStorage : sessionStorage;

  // Store the authentication data
  storage.setItem("accessToken", token);
  storage.setItem("expiresAt", expiresAt);

  // Only store email if remember me is checked
  if (rememberMe) {
    localStorage.setItem("userEmail", email);
  }
}

/**
 * Retrieves saved authentication data
 */
export function getSavedAuthData() {
  // Try localStorage first (for remembered logins)
  let token = localStorage.getItem("accessToken");
  let expiresAt = localStorage.getItem("expiresAt");
  const email = localStorage.getItem("userEmail");

  // If not found in localStorage, try sessionStorage
  if (!token) {
    token = sessionStorage.getItem("accessToken");
    expiresAt = sessionStorage.getItem("expiresAt");
  }

  return {
    token,
    expiresAt,
    email,
    isRemembered: !!email,
  };
}

/**
 * Checks if there's a valid saved token
 */
export function hasValidSavedToken() {
  const { token, expiresAt } = getSavedAuthData();

  if (!token || !expiresAt) return false;

  // Check if token is still valid (not expired)
  return new Date(expiresAt) > new Date();
}

/**
 * Clears all saved authentication data
 */
export function clearAuthData() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expiresAt");
  localStorage.removeItem("userEmail");

  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("expiresAt");
}
