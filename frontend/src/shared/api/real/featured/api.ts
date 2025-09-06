

import { realApi } from '../base-api';
import { FeaturedVideo, FeaturedVideoWithSeller, CreateFeaturedVideoRequest, UpdateFeaturedVideoRequest } from '../types';

export const featuredApi = {
  // 📃 Получить все фичеред видео (с информацией о продавцах)
  getFeaturedVideos: async (): Promise<FeaturedVideoWithSeller[]> => {
    // 🎯 ЗАМЕНИТЬ: '/api/featured-videos' на ваш endpoint
    const response = await realApi.get<FeaturedVideoWithSeller[]>('/api/featured-videos');
    return response.data;
  },

  // 📄 Получить видео по ID
  getFeaturedVideoById: async (id: number): Promise<FeaturedVideo> => {
    // 🎯 ЗАМЕНИТЬ: '/api/featured-videos/{id}' на ваш endpoint
    const response = await realApi.get<FeaturedVideo>(`/api/featured-videos/${id}`);
    return response.data;
  },

  // ➕ Создать новое фичеред видео
  createFeaturedVideo: async (videoData: CreateFeaturedVideoRequest): Promise<FeaturedVideo> => {
    // 🎯 ЗАМЕНИТЬ: '/api/featured-videos' на ваш endpoint
    const response = await realApi.post<FeaturedVideo>('/api/featured-videos', videoData);
    return response.data;
  },

  // ✏️ Обновить фичеред видео
  updateFeaturedVideo: async (videoData: UpdateFeaturedVideoRequest): Promise<FeaturedVideo> => {
    // 🎯 ЗАМЕНИТЬ: '/api/featured-videos/{id}' на ваш endpoint
    const response = await realApi.put<FeaturedVideo>(`/api/featured-videos/${videoData.id}`, videoData);
    return response.data;
  },

  // 🗑️ Удалить фичеред видео
  deleteFeaturedVideo: async (id: number): Promise<void> => {
    // 🎯 ЗАМЕНИТЬ: '/api/featured-videos/{id}' на ваш endpoint
    await realApi.delete(`/api/featured-videos/${id}`);
  }
};