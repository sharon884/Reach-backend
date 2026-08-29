export type UserRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";

export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}