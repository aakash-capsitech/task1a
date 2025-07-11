import axiosInstance from "../services/axiosInstance";

type ToastMessages = {
  success?: string;
  error?: string;
  warn?: string;
  info?: string;
  delete?: string;
};

export async function apiCall<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  toastMessages?: ToastMessages
): Promise<T | { error: string }> {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error: any) {
    const msg =
      toastMessages?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    return { error: msg };
  }
}
