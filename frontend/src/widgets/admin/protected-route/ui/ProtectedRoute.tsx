import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/shared/hooks/use-admin-auth';
import { Loader } from '@/shared/ui/loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAdminAuth(); // ← Используем реальные поля из хука

  if (loading) {
    return <Loader />;
  }

  if (!user) { // ← Проверяем наличие пользователя вместо isAuthenticated
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};