// layout.tsx
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminHeader } from '../../widgets/admin/header';
import styles from './layout.module.css';

export const AdminLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('/login');

  // Скрываем основной хедер и навбар для всей админки
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';
    
    return () => {
      if (header) header.style.display = '';
    };
  }, []);

  return (
    <div className={styles.adminLayout}>
      <main className={styles.mainContent}>
        {!isLoginPage && <AdminHeader />}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};