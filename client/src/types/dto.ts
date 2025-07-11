// DTOs used in API calls

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface CreateLoginRuleDto {
  userIds: string[];
  restriction: string; // e.g., "deny"
  fromDate?: string; // ISO string
  toDate?: string;   // ISO string
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: string;
  phone: string;
  nationality: string;
  address: string;
  configRoles?: string[];
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  nationality?: string;
  address?: string;
  configRoles?: string[];
}
