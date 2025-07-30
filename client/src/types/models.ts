//for future use

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
  passwordHash?: string; 
}

export interface LoginRule {
  id: string;
  userIds: string[];        
  restriction: string;      
  fromDate?: string;         
  toDate?: string; 
}

export interface LogEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}
