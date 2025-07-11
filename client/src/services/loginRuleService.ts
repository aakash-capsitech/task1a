import { apiCall } from "../utils/apiCall";
import type { CreateLoginRuleDto } from "../types/dto";
import type { LoginRule } from "../types/models";

export async function getAllLoginRules(): Promise<LoginRule[] | null> {
  const result = await apiCall<LoginRule[]>("get", "/loginrules", undefined, {
    error: "Failed to load login rules",
  });
  return "error" in result ? null : result;
}

export async function createLoginRules(
  dto: CreateLoginRuleDto
): Promise<LoginRule[] | null> {
  const result = await apiCall<LoginRule[]>("post", "/loginrules", dto, {
    success: "Login rule(s) created",
    error: "Failed to create login rules",
  });
  return "error" in result ? null : result;
}

export async function updateLoginRule(
  id: string,
  dto: CreateLoginRuleDto
): Promise<boolean> {
  const result = await apiCall("put", `/loginrules/${id}`, dto, {
    success: "Login rule updated",
    error: "Update failed",
  }) as any;
  return !("error" in result);
}

export async function deleteLoginRule(id: string): Promise<boolean> {
  const result = await apiCall("delete", `/loginrules/${id}`, undefined, {
    delete: "Login rule deleted",
    error: "Delete failed",
  }) as any;
  return !("error" in result);
}
