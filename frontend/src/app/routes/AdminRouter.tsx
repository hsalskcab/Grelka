import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/widgets/admin/protected-route';
import { AdminLayout } from '@/pages/admin/layout';
import { AdminLogin } from '@/pages/admin/login';
import { AdminDashboard } from '@/pages/admin/dashboard';
import { AdminSlides } from '@/pages/admin/slides';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      
      <Route path="*" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="slides" element={<AdminSlides />} />
      </Route>
    </Routes>
  );
};