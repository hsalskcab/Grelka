// 📋 ОПИСАНИЕ: Хук для формы создания/редактирования видео
// 🔧 ИЗМЕНЕНИЯ: Замена Base64 загрузки на реальную загрузку файлов

import { useState } from 'react';
import { uploadApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт

interface VideoFormData {
  title?: string;
  description?: string;
  sellerId?: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: number;
  views?: number;
}

export const useVideoForm = (initialData: VideoFormData = {}) => {
  // 🎯 ДОБАВИТЬ ТИП для formData
  const [formData, setFormData] = useState<VideoFormData>(initialData);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, type: 'image' | 'video') => {
    try {
      setUploading(true);
      setUploadProgress(0);
      
      // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА на сервер
      const response = await uploadApi.uploadFile(file, type, (progress) => {
        setUploadProgress(progress);
      });

      setUploading(false);
      return { success: true, url: response.url };
    } catch (error: any) {
      setUploading(false);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка загрузки файла' 
      };
    }
  };

  const uploadThumbnail = async (file: File) => {
    return uploadFile(file, 'image');
  };

  const uploadVideo = async (file: File) => {
    return uploadFile(file, 'video');
  };

  return {
    formData,
    uploadProgress,
    uploading,
    handleInputChange,
    uploadThumbnail,
    uploadVideo,
    setFormData
  };
};