import React from 'react';
import { FeaturedVideo } from '@/shared/api/real';
import { Seller } from '@/shared/api/real';
import styles from './styles.module.css';

interface VideoListItemProps {
  video: FeaturedVideo;
  seller?: Seller;
  onEdit: (video: FeaturedVideo) => void;
  onDelete: (id: string) => void;
}

const VideoListItem: React.FC<VideoListItemProps> = ({
  video,
  seller,
  onEdit,
  onDelete
}) => {
  const handleEdit = () => {
    onEdit(video);
  };

  const handleDelete = () => {
    onDelete(video.id.toString()); // ← ПРЕОБРАЗУЕМ number в string
  };

  return (
    <div className={styles.item}>
      <div className={styles.cell}>
        <div className={styles.videoInfo}>
          <video
            src={video.videoUrl}
            muted
            className={styles.videoPreview}
            onMouseOver={(e) => e.currentTarget.play()}
            onMouseOut={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
          <div className={styles.videoDetails}>
            <div className={styles.description}>
              {video.description || 'Без описания'}
            </div>
            <div className={styles.url}>
              {video.videoUrl}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cell}>
        {seller ? (
          <div className={styles.seller}>
            <img src={seller.iconUrl} alt={seller.name} className={styles.sellerIcon} /> // ← МЕНЯЕМ seller.icon на seller.iconUrl
            <span className={styles.sellerName}>{seller.name}</span>
          </div>
        ) : (
          <span className={styles.noSeller}>Неизвестный продавец</span>
        )}
      </div>

      <div className={styles.cell}>
        <span className={`${styles.status} ${video.isFeatured ? styles.featured : styles.notFeatured}`}>
          {video.isFeatured ? 'На главной' : 'Скрыто'}
        </span>
      </div>

      <div className={styles.cell}>
        <span className={styles.order}>{video.order}</span>
      </div>

      <div className={styles.cell}>
        <div className={styles.actions}>
          <button onClick={handleEdit} className={styles.editButton} title="Редактировать">
            ✏️
          </button>
          <button onClick={handleDelete} className={styles.deleteButton} title="Удалить">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;