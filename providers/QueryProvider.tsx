// providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Tạo QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Thử lại 1 lần nếu thất bại
      staleTime: 5 * 60 * 1000, // Dữ liệu "tươi" trong 5 phút
      gcTime: 10 * 60 * 1000, // Giữ cache trong 10 phút
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
