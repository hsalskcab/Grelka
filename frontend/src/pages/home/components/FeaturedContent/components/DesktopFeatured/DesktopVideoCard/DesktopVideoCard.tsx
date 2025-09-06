import React, { useState } from 'react';
import { FeaturedVideoWithSeller } from '@/shared/api/real';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import styles from './styles.module.css';

interface DesktopVideoCardProps {
  video: FeaturedVideoWithSeller;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onFullscreen: (index: number) => void;
}

const DesktopVideoCard: React.FC<DesktopVideoCardProps> = ({
  video,
  index,
  isSelected,
  onSelect,
  onFullscreen
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isSelected) {
      onSelect(index);
    }
  };

  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFullscreen(index);
  };

  return (
    <div
      className={`${styles.videoCard} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VideoPlayer
        videoUrl={video.videoUrl}
        isPlaying={isSelected}
        onPlay={() => onSelect(index)}
        onPause={() => {}}
        showProgress={isSelected}
        className={styles.video}
      />

      {/* Overlay with seller info (visible when not selected) */}
      {!isSelected && (
        <div className={styles.overlay}>
          <div className={styles.sellerInfo}>
            <img src={video.seller.iconUrl} alt={video.seller.name} className={styles.sellerIcon} />
            <span className={styles.sellerName}>{video.seller.name}</span>
          </div>
        </div>
      )}

      {/* Fullscreen button (visible when selected or hovered) */}
      {(isSelected || isHovered) && (
        <button
          className={styles.fullscreenButton}
          onClick={handleFullscreenClick}
          aria-label="Полноэкранный режим"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default DesktopVideoCard;