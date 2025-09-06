import { useState } from 'react';
import { uploadApi } from '@/shared/api/real'; // ← ИЗМЕНИТЬ импорт

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<boolean> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      // 🎯 РЕАЛЬНАЯ ЗАГРУЗКА на сервер
      const response = await uploadApi.uploadFile(file, 'image', (progress) => {
        setUploadProgress(progress);
      });

      setImageUrl(response.url);
      setIsUploading(false);
      return true;
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка загрузки изображения');
      setIsUploading(false);
      return false;
    }
  };

  const removeImage = async (): Promise<void> => {
    if (imageUrl) {
      try {
        // 🎯 РЕАЛЬНОЕ УДАЛЕНИЕ файла если нужно
        await uploadApi.deleteFile(imageUrl);
      } catch (err) {
        console.error('Ошибка удаления файла:', err);
      }
    }
    setImageUrl('');
    setError(null);
  };

  return {
    imageUrl,
    uploadProgress,
    isUploading,
    error,
    uploadImage,
    removeImage,
    setImageUrl
  };
};