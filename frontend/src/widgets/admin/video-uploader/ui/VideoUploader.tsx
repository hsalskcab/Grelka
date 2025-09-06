import React, { useRef, useCallback } from 'react';
import { useVideoUpload } from '../lib/useVideoUpload';
import styles from './styles.module.css';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
  maxSize?: number;
  className?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
  onVideoUpload,
  maxSize = 50 * 1024 * 1024,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isUploading,
    error,
    uploadProgress: progress, // ← переименовываем uploadProgress в progress
    uploadVideo,
    // Убираем ненужные поля
  } = useVideoUpload();

  // Добавляем константы которых нет в хуке
  const acceptedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const maxSizeMB = Math.round(maxSize / 1024 / 1024);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const success = await uploadVideo(file);
      if (success) {
        onVideoUpload(file);
      }
    }
  }, [uploadVideo, onVideoUpload]);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const success = await uploadVideo(file);
      if (success) {
        onVideoUpload(file);
      }
    }
  }, [uploadVideo, onVideoUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleClick = useCallback(() => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [isUploading]);

  const formatFileTypes = () => {
    return acceptedTypes.map(type => type.replace('video/', '')).join(', ');
  };

  // Функция reset не реализована в хуке, создаем простую версию
  const reset = () => {
    // Можно очистить input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${styles.videoUploader} ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className={styles.fileInput}
        disabled={isUploading}
      />
      
      <div
        className={`${styles.uploadArea} ${isUploading ? styles.uploading : ''} ${error ? styles.error : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {isUploading ? (
          <div className={styles.uploadingContent}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>
              Загрузка... {progress}%
            </span>
          </div>
        ) : (
          <div className={styles.initialContent}>
            <div className={styles.uploadIcon}>📁</div>
            <h3 className={styles.title}>Загрузить видео</h3>
            <p className={styles.subtitle}>
              Перетащите видео сюда или нажмите для выбора
            </p>
            <p className={styles.fileInfo}>
              Поддерживаемые форматы: {formatFileTypes()}
              <br />
              Максимальный размер: {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
          <button onClick={reset} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      )}

      {!isUploading && progress === 100 && (
        <div className={styles.successMessage}>
          <span className={styles.successIcon}>✅</span>
          Видео успешно загружено!
        </div>
      )}
    </div>
  );
};

export default VideoUploader;