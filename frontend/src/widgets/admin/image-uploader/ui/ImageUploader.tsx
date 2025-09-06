import React, { useRef } from 'react';
import { useImageUpload } from '../lib/useImageUpload';
import styles from './styles.module.css';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImage,
  label = 'Загрузить изображение'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    imageUrl,
    uploadProgress,
    isUploading,
    error,
    uploadImage,
    removeImage
  } = useImageUpload();

  const displayUrl = currentImage || imageUrl;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    // Проверка размера файла (например, 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    const success = await uploadImage(file);
    if (success) {
      onImageUpload(imageUrl);
    }
  };

  const handleRemove = async () => {
    await removeImage();
    onImageUpload('');
  };

  return (
    <div className={styles.uploader}>
      {label && <label className={styles.label}>{label}</label>}
      
      <div className={styles.previewContainer}>
        {displayUrl ? (
          <>
            <img src={displayUrl} alt="Preview" className={styles.previewImage} />
            <button
              type="button"
              onClick={handleRemove}
              className={styles.removeButton}
              disabled={isUploading}
            >
              ×
            </button>
          </>
        ) : (
          <div className={styles.placeholder}>
            {isUploading ? 'Загрузка...' : 'Изображение не выбрано'}
          </div>
        )}
      </div>

      {isUploading && (
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${uploadProgress}%` }}
          />
          <span className={styles.progressText}>{uploadProgress}%</span>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className={styles.fileInput}
        disabled={isUploading}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={styles.uploadButton}
        disabled={isUploading}
      >
        {isUploading ? 'Загрузка...' : 'Выбрать изображение'}
      </button>
    </div>
  );
};