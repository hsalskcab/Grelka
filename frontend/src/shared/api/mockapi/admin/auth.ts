import { AdminCredentials, AuthResponse, AdminUser } from './types';

export const adminAuthApi = {
  // Вход в админку (фиктивный для MockAPI)
  login: async (credentials: AdminCredentials): Promise<AuthResponse> => {
    // В реальности здесь запрос к API, но для MockAPI имитируем ответ
    const mockAdminUser: AdminUser = {
      id: '1',
      email: credentials.email,
      name: 'Администратор',
      role: 'admin',
    };

    const mockResponse: AuthResponse = {
      user: mockAdminUser,
      token: 'mock-jwt-token-' + Date.now(),
    };

    // Сохраняем в localStorage для имитации
    localStorage.setItem('adminToken', mockResponse.token);
    localStorage.setItem('adminUser', JSON.stringify(mockResponse.user));

    return Promise.resolve(mockResponse);
  },

  // Выход из админки
  logout: async (): Promise<void> => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return Promise.resolve();
  },

  // Проверка авторизации
  checkAuth: async (): Promise<AdminUser | null> => {
    const userData = localStorage.getItem('adminUser');
    const token = localStorage.getItem('adminToken');

    if (!token || !userData) {
      return null;
    }

    return JSON.parse(userData);
  },
};