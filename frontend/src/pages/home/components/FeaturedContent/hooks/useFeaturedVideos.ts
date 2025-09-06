
import { useState, useEffect } from 'react';
import { featuredApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт
import { FeaturedVideoWithSeller } from '@/shared/api/real/types'; // ← ИЗМЕНИТЬ импорт

export const useFeaturedVideos = () => {
  const [videos, setVideos] = useState<FeaturedVideoWithSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVideos = async () => {
      try {
        setLoading(true);
        // 🎯 РЕАЛЬНЫЙ ЗАПРОС вместо мокового
        const videosData = await featuredApi.getFeaturedVideos();
        setVideos(videosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки видео');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVideos();
  }, []);

  return { videos, loading, error };
};