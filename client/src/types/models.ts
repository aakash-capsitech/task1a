// Response models returned by API

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  nationality: string;
  address: string;
  configRoles: string[];
  logins?: number;
  passwordHash?: string; // only returned in some responses
}

export interface LoginRule {
  id: string;
  userIds: string[];         // should be single-user per rule
  restriction: string;       // "deny" or similar
  fromDate?: string;         // ISO format
  toDate?: string;           // ISO format
}

export interface LogEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}
