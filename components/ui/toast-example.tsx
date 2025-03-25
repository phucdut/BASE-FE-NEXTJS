"use client";
import { toast } from "sonner";

export default function ToastExample() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={() => toast.success("Đăng nhập thành công!")}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Thành công ✅
      </button>

      <button
        onClick={() => toast.error("Có lỗi xảy ra!")}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Lỗi ❌
      </button>

      <button
        onClick={() => toast.info("Thông báo mới!")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thông báo ℹ️
      </button>

      <button
        onClick={() => toast.warning("Cảnh báo!")}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Cảnh báo ⚠️
      </button>

      <button
        onClick={() =>
          toast("Loading...", {
            description: "Đang xử lý dữ liệu...",
            action: {
              label: "Hủy",
              onClick: () => alert("Đã hủy"),
            },
          })
        }
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Tùy chỉnh 🛠️
      </button>
    </div>
  );
}
