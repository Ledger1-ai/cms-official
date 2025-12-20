"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "rgba(10, 10, 11, 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(77, 191, 217, 0.2)",
          color: "#fff",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        },
        success: {
          iconTheme: {
            primary: "#4DBFD9",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};
