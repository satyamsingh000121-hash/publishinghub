export type UserRole = "USER" | "ADMIN";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  phoneNumber?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponseData {
  user: UserDTO;
  token: string;
  expiresIn: string;
}
