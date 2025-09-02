import { useState, useEffect, useCallback } from 'react';
import { AdminUser, AdminCredentials } from '../api/mockapi/admin/types';
import { adminAuthApi } from '../api/mockapi/admin/auth';

export const useAdminAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем авторизацию при монтировании
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const userData = await adminAuthApi.checkAuth();
      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: AdminCredentials) => {
    try {
      setIsLoading(true);
      const response = await adminAuthApi.login(credentials);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Ошибка входа' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminAuthApi.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };
};