import { CategoryNavigation } from './components/CategoryNavigation';
import Featured from './components/FeaturedContent';
import { HeroSlider } from './components/HeroSlider';
import styles from './styles.module.css'; // Импортируем стили

export const HomePage = () => {
  return (
    <div className={styles.container}> {/* Обертка с классом */}
      <CategoryNavigation />
      <HeroSlider />
      <Featured />
      {/* Будущие компоненты тоже будут иметь отступ 60px */}
    </div>
  );
};