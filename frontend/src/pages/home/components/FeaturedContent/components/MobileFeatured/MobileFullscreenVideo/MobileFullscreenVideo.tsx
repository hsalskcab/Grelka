import React, { useState, useEffect } from 'react';
import { FeaturedVideoWithSeller } from '../../../hooks/types';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import styles from './styles.module.css';

interface MobileFullscreenVideoProps {
  videos: FeaturedVideoWithSeller[];
  initialIndex: number;
  onClose: () => void;
}

const MobileFullscreenVideo: React.FC<MobileFullscreenVideoProps> = ({
  videos,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentVideo = videos[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.fullscreenOverlay} onClick={handleBackdropClick}>
      <div className={styles.fullscreenContent}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Video player */}
        <div className={styles.videoContainer}>
          <VideoPlayer
            videoUrl={currentVideo.videoUrl}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            showProgress={true}
            className={styles.video}
          />
        </div>

        {/* Video info */}
        <div className={styles.videoInfo}>
          <div className={styles.sellerInfo}>
            <img src={currentVideo.seller.icon} alt={currentVideo.seller.name} className={styles.sellerIcon} />
            <span className={styles.sellerName}>{currentVideo.seller.name}</span>
          </div>
          <p className={styles.videoDescription}>{currentVideo.description}</p>
        </div>

        {/* Swipe areas for navigation */}
        <div 
          className={styles.swipeAreaLeft}
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe('right');
          }}
        />
        <div 
          className={styles.swipeAreaRight}
          onClick={(e) => {
            e.stopPropagation();
            handleSwipe('left');
          }}
        />
      </div>
    </div>
  );
};

export default MobileFullscreenVideo;