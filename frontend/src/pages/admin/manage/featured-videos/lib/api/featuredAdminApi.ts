import { featuredApi } from '@/shared/api/real';
import { sellersApi } from '@/shared/api/real';
import { FeaturedVideo } from '@/shared/api/real/types';
import { Seller } from '@/shared/api/real/types';

export const featuredAdminApi = {
  // Получить все данные для админки
  getAdminData: async (): Promise<{
    videos: FeaturedVideo[];
    sellers: Seller[];
  }> => {
    const [videos, sellers] = await Promise.all([
      featuredApi.getFeaturedVideos(), // ← ИЗМЕНИТЬ getVideos
      sellersApi.getSellers()
    ]);
    return { videos, sellers };
  },

  // Создать видео с валидацией
  createVideoWithValidation: async (videoData: any): Promise<FeaturedVideo> => {
    if (!videoData.videoUrl) throw new Error('URL видео обязателен');
    if (!videoData.sellerId) throw new Error('Необходимо выбрать продавца');
    if (videoData.order < 0) throw new Error('Порядок не может быть отрицательным');

    return featuredApi.createFeaturedVideo(videoData); // ← ИЗМЕНИТЬ createVideo
  },

  // Обновить видео с валидацией
  updateVideoWithValidation: async (id: number, videoData: any): Promise<FeaturedVideo> => {
    if (!videoData.videoUrl) throw new Error('URL видео обязателен');
    if (!videoData.sellerId) throw new Error('Необходимо выбрать продавца');
    if (videoData.order < 0) throw new Error('Порядок не может быть отрицательным');

    return featuredApi.updateFeaturedVideo({ id, ...videoData }); // ← ИЗМЕНИТЬ updateVideo
  },

  // Удалить видео
  deleteVideo: async (id: number): Promise<void> => {
    return featuredApi.deleteFeaturedVideo(id); // ← ИЗМЕНИТЬ deleteVideo
  },

  // Массовое обновление порядка видео
  updateVideosOrder: async (videos: FeaturedVideo[]): Promise<void> => {
    const updatePromises = videos.map((video, index) =>
      featuredApi.updateFeaturedVideo({ id: video.id, order: index }) // ← ИЗМЕНИТЬ updateVideo
    );
    await Promise.all(updatePromises);
  },

  // Получить видео с данными продавца
  getVideoWithSeller: async (videoId: number): Promise<{
    video: FeaturedVideo;
    seller: Seller | null;
  }> => {
    const [video, sellers] = await Promise.all([
      featuredApi.getFeaturedVideoById(videoId), // ← ИЗМЕНИТЬ getVideoById
      sellersApi.getSellers()
    ]);
    
    const seller = sellers.find(s => s.id === video.sellerId) || null;
    return { video, seller };
  }
};