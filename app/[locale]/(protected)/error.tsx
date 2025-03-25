"use client";
import Image from "next/image";
import React from "react";

const AdminError = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0">
              <Image
                src="/notification_icons/error_icon.svg"
                alt="error_icon"
                width={128}
                height={128}
              ></Image>
            </div>
            <h1 className="text-3xl font-semibold mt-4">Oops!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminError;
