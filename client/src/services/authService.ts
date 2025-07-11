import { apiCall } from "../utils/apiCall";
import type { LoginRequest } from "../types/dto";

export async function login(request: LoginRequest) {
  return await apiCall<any>("post", "/aAuth/login", request, {
    success: "Logged in successfully",
    error: "Login failed",
  });
}
