import { useAdminAuth } from '../../../../shared/hooks/use-admin-auth';
import styles from './styles.module.css';

export const AdminHeader = () => {
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      await logout();
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <span>👤 {user?.name}</span>
      </div>
      
      <button onClick={handleLogout} className={styles.logoutBtn}>
        🚪 Выйти
      </button>
    </header>
  );
};