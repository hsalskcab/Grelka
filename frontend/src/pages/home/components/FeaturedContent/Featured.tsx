import React from 'react';
import { useFeaturedVideos } from './hooks/useFeaturedVideos';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import DesktopFeatured from './components/DesktopFeatured/DesktopFeatured';
import MobileFeatured from './components/MobileFeatured/MobileFeatured';
import styles from './styles.module.css';

const Featured: React.FC = () => {
  const { videos, loading, error } = useFeaturedVideos();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (loading) {
    return <div className={styles.loading}>Загрузка видео...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка загрузки видео: {error}</div>;
  }

  if (!videos.length) {
    return null;
  }

  return (
    <section className={styles.featured}>
      {isDesktop ? (
        <DesktopFeatured videos={videos} />
      ) : (
        <MobileFeatured videos={videos} />
      )}
    </section>
  );
};

export default Featured;