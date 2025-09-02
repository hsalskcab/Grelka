import { useState } from 'react';

export const useImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setUploadedImage(file);
    
    // Здесь будет логика загрузки на сервер
    // Пока просто сохраняем файл в состоянии
    setIsUploading(false);
  };

  const resetImage = () => {
    setUploadedImage(null);
  };

  return {
    uploadedImage,
    isUploading,
    handleImageUpload,
    resetImage
  };
};