import { apiCall } from "../utils/apiCall";
import type {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
} from "../types/dto";
import type { User } from "../types/models";

export async function createUser(dto: CreateUserDto): Promise<User | null> {
  const result = await apiCall<User>("post", "/users", dto, {
    success: "User created",
    error: "This email already exists",
  });
  return "error" in result ? null : result;
}

export async function updateUser(
  id: string,
  dto: UpdateUserDto
): Promise<any> {
  const result = await apiCall("put", `/users/${id}`, dto, {
    success: "User updated",
    error: "Failed to update user",
  }) as User | { error: string };
  return "error" in result ? null : result;
}

export async function deleteUser(id: string): Promise<boolean> {
  const result = await apiCall("delete", `/users/${id}`, undefined, {
    delete: "User deleted",
    error: "Delete failed",
  }) as User | { error: string };
  return !("error" in result);
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await apiCall<User>("get", `/users/${id}`, undefined, {
    error: "Failed to fetch user",
  });
  return "error" in result ? null : result;
}

export async function getCurrentUser(): Promise<User | null> {
  const result = await apiCall<User>("get", "/users/me", undefined, {
    error: "Failed to fetch current user",
  });
  return "error" in result ? null : result;
}

export async function getUsers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
  nationality?: string;
}): Promise<{ total: number; users: User[] } | null> {
  const result = await apiCall<{ total: number; users: User[] }>(
    "get",
    "/users",
    params,
    {
      error: "Failed to load users",
    }
  );
  return "error" in result ? null : result;
}

export async function changePassword(
  id: string,
  dto: ChangePasswordDto
): Promise<any> {
  const result = await apiCall("post", `/users/${id}/change-password`, dto, {
    success: "Password changed",
    error: "Failed to change password",
  }) as User | { error: string };
  return "error" in result ? null : result;
}
