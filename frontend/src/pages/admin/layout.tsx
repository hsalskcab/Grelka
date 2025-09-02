import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../widgets/admin/sidebar';
import { AdminHeader } from '../../widgets/admin/header';
import styles from './layout.module.css';

export const AdminLayout = () => {
  // Скрываем основной хедер и навбар для админки
  useEffect(() => {
    const header = document.querySelector('header');
    const navbar = document.querySelector('nav');
    
    if (header) header.style.display = 'none';
    if (navbar) navbar.style.display = 'none';
    
    return () => {
      if (header) header.style.display = '';
      if (navbar) navbar.style.display = '';
    };
  }, []);

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};