import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import "./ctoast.css";

type ToastType = "success" | "error" | "info" | "warn";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const CToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const CToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = toastId++;
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000); // Toast stays for 4 seconds
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <CToastContext.Provider value={{ showToast }}>
      {children}
      <div className="ctoast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`ctoast ctoast-${toast.type}`}>
            <div className="ctoast-message">{toast.message}</div>
            <button className="ctoast-close" onClick={() => removeToast(toast.id)}>×</button>
            <div className="ctoast-progress" />
          </div>
        ))}
      </div>
    </CToastContext.Provider>
  );
};

export const useCToast = () => {
  const context = useContext(CToastContext);
  if (!context) throw new Error("useCToast must be used within CToastProvider");
  return context;
};
