import React from 'react';
import { FeaturedVideoWithSeller } from '../../../hooks/types';
import styles from './styles.module.css';

interface MobileVideoCardProps {
  video: FeaturedVideoWithSeller;
  index: number;
  onSelect: (index: number) => void;
}

const MobileVideoCard: React.FC<MobileVideoCardProps> = ({
  video,
  index,
  onSelect
}) => {
  const handleClick = () => {
    onSelect(index);
  };

  return (
    <div className={styles.videoCard} onClick={handleClick}>
      <div className={styles.videoThumbnail}>
        <video
          src={video.videoUrl}
          muted
          className={styles.video}
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        
        {/* Play button overlay */}
        <div className={styles.playOverlay}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Seller info */}
      <div className={styles.sellerInfo}>
        <img src={video.seller.icon} alt={video.seller.name} className={styles.sellerIcon} />
        <span className={styles.sellerName}>{video.seller.name}</span>
      </div>
    </div>
  );
};

export default MobileVideoCard;