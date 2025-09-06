// 📋 ОПИСАНИЕ: Хук для аутентификации администратора
// 🔧 ИЗМЕНЕНИЯ: Замена фиктивной аутентификации на реальную

import { useState, useEffect } from 'react';
import { authApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт
import { AdminUser } from '@/shared/api/real/types'; // ← ИЗМЕНИТЬ импорт

export const useAdminAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('adminUser');

      if (token && savedUser) {
        try {
          // 🎯 РЕАЛЬНАЯ ПРОВЕРКА токена
          const isValid = await authApi.validateToken(token);
          if (isValid) {
            setUser(JSON.parse(savedUser));
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('adminUser');
          }
        } catch {
          localStorage.removeItem('authToken');
          localStorage.removeItem('adminUser');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // 🎯 РЕАЛЬНЫЙ ВХОД вместо мокового
      const response = await authApi.login({ email, password });
      
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('adminUser', JSON.stringify(response.user));
      setUser(response.user);
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка входа' 
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminUser');
      setUser(null);
    }
  };

  return { user, loading, login, logout };
};