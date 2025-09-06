import { useAdminAuth } from '../../../shared/hooks/use-admin-auth';
import { useState } from 'react';
import AdminFeaturedVideos from '../manage/featured-videos/AdminFeaturedVideos';
import { AdminSlides } from '../manage/slides/index'; // ДОБАВЬТЕ ЭТОТ ИМПОРТ
import styles from './styles.module.css';

export const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'videos':
        return <AdminFeaturedVideos />;
      case 'slides': // ДОБАВЬТЕ ЭТОТ КЕЙС
        return <AdminSlides />;
      case 'dashboard':
      default:
        return (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🖼️</div>
              <div className={styles.statContent}>
                <h3>Слайды</h3>
                <p>Управление главным слайдером</p>
                <button 
                  onClick={() => setActiveSection('slides')}
                  className={styles.statLink}
                >
                  Перейти к управлению →
                </button>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎬</div>
              <div className={styles.statContent}>
                <h3>Видео</h3>
                <p>Управление видеоконтентом</p>
                <button 
                  onClick={() => setActiveSection('videos')}
                  className={styles.statLink}
                >
                  Перейти к управлению →
                </button>
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
        );
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h1>Добро пожаловать, {user?.name}! 👋</h1>
        <p>Панель управления контентом сайта</p>
      </div>

      {activeSection !== 'dashboard' && (
        <button 
          onClick={() => setActiveSection('dashboard')}
          className={styles.backButton}
        >
          ← Назад к дашборду
        </button>
      )}

      {renderContent()}
    </div>
  );
};