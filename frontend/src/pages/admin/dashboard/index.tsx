import { useAdminAuth } from '../../../shared/hooks/use-admin-auth';
import styles from './styles.module.css';

export const AdminDashboard = () => {
  const { user } = useAdminAuth();

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h1>Добро пожаловать, {user?.name}! 👋</h1>
        <p>Панель управления контентом сайта</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🖼️</div>
          <div className={styles.statContent}>
            <h3>Слайды</h3>
            <p>Управление главным слайдером</p>
            <a href="/admin/slides" className={styles.statLink}>
              Перейти к управлению →
            </a>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3>Статистика</h3>
            <p>Просмотр аналитики сайта</p>
            <span className={styles.comingSoon}>Скоро</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statContent}>
            <h3>Пользователи</h3>
            <p>Управление пользователями</p>
            <span className={styles.comingSoon}>Скоро</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚙️</div>
          <div className={styles.statContent}>
            <h3>Настройки</h3>
            <p>Настройки сайта</p>
            <span className={styles.comingSoon}>Скоро</span>
          </div>
        </div>
      </div>
    </div>
  );
};