import { FeaturedVideo } from '@/shared/api/real';
import { Seller } from '@/shared/api/real';

export const getSellerName = (video: FeaturedVideo, sellers: Seller[]): string => {
  const seller = sellers.find(s => s.id === video.sellerId);
  return seller?.name || 'Неизвестный продавец';
};

export const getSellerIcon = (video: FeaturedVideo, sellers: Seller[]): string => {
  const seller = sellers.find(s => s.id === video.sellerId);
  return seller?.iconUrl || '';
};

export const validateVideoForm = (formData: any): string[] => {
  const errors: string[] = [];

  if (!formData.videoUrl) {
    errors.push('URL видео обязателен');
  } else if (!isValidUrl(formData.videoUrl)) {
    errors.push('Некорректный URL видео');
  }

  if (!formData.sellerId) {
    errors.push('Необходимо выбрать продавца');
  }

  if (formData.order < 0) {
    errors.push('Порядок не может быть отрицательным');
  }

  return errors;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sortVideos = (videos: FeaturedVideo[], sortBy: keyof FeaturedVideo = 'order'): FeaturedVideo[] => {
  return [...videos].sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;
    
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
};

export const filterFeaturedVideos = (videos: FeaturedVideo[]): FeaturedVideo[] => {
  return videos.filter(video => video.isFeatured);
};