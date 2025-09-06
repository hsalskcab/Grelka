import React from 'react';
import { FeaturedVideo } from '@/shared/api/real';
import { Seller } from '@/shared/api/real';
import VideoListItem from '../VideoListItem/VideoListItem';
import styles from './styles.module.css';

interface VideoListProps {
  videos: FeaturedVideo[];
  sellers: Seller[];
  onEdit: (video: FeaturedVideo) => void;
  onDelete: (id: string) => void;
}

// Изменяем на именованный экспорт
export const VideoList: React.FC<VideoListProps> = ({
  videos,
  sellers,
  onEdit,
  onDelete
}) => {
  if (videos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет добавленных видео</p>
        <p>Нажмите "Добавить видео" чтобы создать первое</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.cell}>Видео</span>
        <span className={styles.cell}>Продавец</span>
        <span className={styles.cell}>Статус</span>
        <span className={styles.cell}>Порядок</span>
        <span className={styles.cell}>Действия</span>
      </div>
      
      {videos.map(video => {
        const seller = sellers.find(s => s.id === video.sellerId);
        return (
          <VideoListItem
            key={video.id}
            video={video}
            seller={seller}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

// Оставляем default export для обратной совместимости
export default VideoList;