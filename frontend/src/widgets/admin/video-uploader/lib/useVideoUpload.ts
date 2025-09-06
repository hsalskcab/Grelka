// 📋 ОПИСАНИЕ: Хук для загрузки видео
// 🔧 ИЗМЕНЕНИЯ: Замена Base64 на реальную загрузку через API

import { useState } from 'react';
import { uploadApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт

export const useVideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadVideo = async (file: File): Promise<boolean> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА видео на сервер
      const response = await uploadApi.uploadFile(file, 'video', (progress) => {
        setUploadProgress(progress);
      });

      setVideoUrl(response.url);
      setIsUploading(false);
      return true;
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки видео');
      setIsUploading(false);
      return false;
    }
  };

  const uploadThumbnail = async (file: File): Promise<boolean> => {
    try {
      // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА thumbnail на сервер
      const response = await uploadApi.uploadFile(file, 'image');
      setThumbnailUrl(response.url);
      return true;
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки thumbnail');
      return false;
    }
  };

  const removeVideo = async (): Promise<void> => {
    if (videoUrl) {
      try {
        await uploadApi.deleteFile(videoUrl);
      } catch (err) {
        console.error('Ошибка удаления видео:', err);
      }
    }
    setVideoUrl('');
    setError(null);
  };

  const removeThumbnail = async (): Promise<void> => {
    if (thumbnailUrl) {
      try {
        await uploadApi.deleteFile(thumbnailUrl);
      } catch (err) {
        console.error('Ошибка удаления thumbnail:', err);
      }
    }
    setThumbnailUrl('');
    setError(null);
  };

  return {
    videoUrl,
    thumbnailUrl,
    uploadProgress,
    isUploading,
    error,
    uploadVideo,
    uploadThumbnail,
    removeVideo,
    removeThumbnail,
    setVideoUrl,
    setThumbnailUrl
  };
};