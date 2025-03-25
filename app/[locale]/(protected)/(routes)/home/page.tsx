// // app/[locale]/page.tsx

// import { login } from "@/api/services/auth";

// export default async function Home() {
//   // Gọi API từ server-side (nếu cần)
//   const handleLogin = async () => {
//     "use server"; // Nếu dùng Server Actions
//     try {
//       const response = await login({
//         email: "user@example.com",
//         password: "password123",
//       });
//       console.log("Login success:", response);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Trang chủ</h1>
//       <form action={handleLogin}>
//         <button type="submit">Đăng nhập</button>
//       </form>
//     </div>
//   );
// }

import React from "react";

import ProfileButton from "./home-form";

const HomePage = () => {
  return (
    <div>
      <ProfileButton />
    </div>
  );
};

export default HomePage;
