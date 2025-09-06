import React, { useState } from 'react';
import { FeaturedVideoWithSeller } from '../../hooks/types';
import MobileVideoCard from './MobileVideoCard/MobileVideoCard';
import MobileFullscreenVideo from './MobileFullscreenVideo/MobileFullscreenVideo';
import styles from './styles.module.css';

interface MobileFeaturedProps {
  videos: FeaturedVideoWithSeller[];
}

const MobileFeatured: React.FC<MobileFeaturedProps> = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleVideoSelect = (index: number) => {
    setSelectedVideoIndex(index);
    setIsFullscreen(true);
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
    setSelectedVideoIndex(null);
  };

  if (isFullscreen && selectedVideoIndex !== null) {
    return (
      <MobileFullscreenVideo
        videos={videos}
        initialIndex={selectedVideoIndex}
        onClose={handleFullscreenClose}
      />
    );
  }

  return (
    <div className={styles.mobileFeatured}>
      <h3 className={styles.title}>Избранные видео</h3>
      <div className={styles.videosScroll}>
        {videos.slice(0, 6).map((video, index) => (
          <MobileVideoCard
            key={video.id}
            video={video}
            index={index}
            onSelect={handleVideoSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileFeatured;