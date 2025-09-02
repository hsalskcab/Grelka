export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
}

export interface AuthResponse {
  user: AdminUser;
  token: string;
}