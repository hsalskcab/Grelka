import React, { useState, useEffect } from 'react';
import { FeaturedVideoWithSeller } from '../../../hooks/types';
import VideoPlayer from '../../VideoPlayer/VideoPlayer';
import styles from './styles.module.css';

interface FullscreenVideoProps {
  videos: FeaturedVideoWithSeller[];
  initialIndex: number;
  onClose: () => void;
}

const FullscreenVideo: React.FC<FullscreenVideoProps> = ({
  videos,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentVideo = videos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === ' ') {
      setIsPlaying(prev => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
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

        {/* Navigation buttons */}
        <button 
          className={styles.navButton} 
          onClick={handlePrev}
          style={{ left: '2rem' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button 
          className={styles.navButton} 
          onClick={handleNext}
          style={{ right: '2rem' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
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
      </div>
    </div>
  );
};

export default FullscreenVideo;