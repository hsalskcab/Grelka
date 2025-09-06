// 📋 ОПИСАНИЕ: Хук для управления фичеред видео в админке
// 🔧 ИЗМЕНЕНИЯ: Замена MockAPI на реальное API

import { useState, useEffect } from 'react';
import { featuredApi, sellersApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт
import { FeaturedVideo, Seller } from '@/shared/api/real/types'; // ← ИЗМЕНИТЬ импорт

export const useFeaturedVideosAdmin = () => {
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 🎯 РЕАЛЬНЫЕ ЗАПРОСЫ
      const [videosData, sellersData] = await Promise.all([
        featuredApi.getFeaturedVideos(),
        sellersApi.getSellers()
      ]);
      
      setVideos(videosData);
      setSellers(sellersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const createVideo = async (videoData: any) => {
    try {
      // 🎯 РЕАЛЬНОЕ СОЗДАНИЕ
      await featuredApi.createFeaturedVideo(videoData);
      await fetchData(); // Обновляем список
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка создания видео' 
      };
    }
  };

  const updateVideo = async (id: number, videoData: any) => {
    try {
      // 🎯 РЕАЛЬНОЕ ОБНОВЛЕНИЕ
      await featuredApi.updateFeaturedVideo({ id, ...videoData });
      await fetchData(); // Обновляем список
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка обновления видео' 
      };
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      // 🎯 РЕАЛЬНОЕ УДАЛЕНИЕ
      await featuredApi.deleteFeaturedVideo(id);
      await fetchData(); // Обновляем список
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка удаления видео' 
      };
    }
  };

  return {
    videos,
    sellers,
    loading,
    error,
    createVideo,
    updateVideo,
    deleteVideo,
    refetch: fetchData
  };
};