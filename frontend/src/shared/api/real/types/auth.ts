export interface LoginRequest {
  email: string;       // 🎯 ЗАМЕНИТЬ: Поле для email/логина
  password: string;    // 🎯 ЗАМЕНИТЬ: Поле для пароля
}

export interface LoginResponse {
  token: string;       // 🎯 ЗАМЕНИТЬ: Поле с JWT токеном
  user: AdminUser;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  // 🎯 ДОБАВИТЬ: другие поля пользователя если есть
}