import { apiCall } from "../utils/apiCall";
import type { LogEntry } from "../types/models";

export async function getLogs(): Promise<LogEntry[] | null> {
  const result = await apiCall<LogEntry[]>("get", "/logs", undefined, {
    error: "Failed to load logs",
  });

  return "error" in result ? null : result;
}
