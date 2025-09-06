
import { realApi } from '../base-api';
import { LoginRequest, LoginResponse,} from './types';

export const authApi = {
  // 🔐 Вход администратора
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // 🎯 ЗАМЕНИТЬ: '/api/auth/login' на ваш endpoint
    const response = await realApi.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  },

  // 🚪 Выход (если нужен на бекенде)
  logout: async (): Promise<void> => {
    // 🎯 ЗАМЕНИТЬ: '/api/auth/logout' если нужно
    await realApi.post('/api/auth/logout');
  },

  // 🔍 Проверка токена (валидность)
  validateToken: async (token: string): Promise<boolean> => {
    try {
      // 🎯 ЗАМЕНИТЬ: '/api/auth/validate' на ваш endpoint
      await realApi.get('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch {
      return false;
    }
  }
};