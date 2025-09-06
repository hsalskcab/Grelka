import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/widgets/admin/protected-route';
import { AdminLayout } from '@/pages/admin/layout';
import { AdminLogin } from '@/pages/admin/login';
import { AdminDashboard } from '@/pages/admin/dashboard';
import { AdminSlides } from '@/pages/admin/manage/slides';

export const AdminRouter = () => {
  return (
    <Routes>
      {/* Все админские маршруты используют AdminLayout */}
      <Route element={<AdminLayout />}>
        {/* Незащищенный маршрут логина */}
        <Route path="login" element={<AdminLogin />} />
        
        {/* Защищенные маршруты */}
        <Route element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="slides" element={<AdminSlides />} />
        </Route>
      </Route>
    </Routes>
  );
};