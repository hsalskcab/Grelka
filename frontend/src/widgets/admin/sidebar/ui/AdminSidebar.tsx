import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

export const AdminSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Админпанель</h2>
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              📊 Дашборд
            </NavLink>
          </li>
          
          <li className={styles.navItem}>
            <NavLink 
              to="/admin/slides" 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              🖼️ Слайды
            </NavLink>
          </li>
          
          <li className={styles.navItem}>
            <button className={styles.navLink} disabled>
              📦 Товары (скоро)
            </button>
          </li>
          
          <li className={styles.navItem}>
            <button className={styles.navLink} disabled>
              🗂️ Категории (скоро)
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};