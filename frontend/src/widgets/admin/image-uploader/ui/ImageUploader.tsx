import React, { useRef, useState } from 'react';
import styles from './styles.module.css';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImage,
  label = 'Загрузить изображение'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className={styles.uploader}>
      <label className={styles.label}>{label}</label>
      
      <div className={styles.previewContainer} onClick={handleClick}>
        {displayImage ? (
          <img 
            src={displayImage} 
            alt="Preview" 
            className={styles.previewImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>+</span>
            <p>Нажмите чтобы загрузить изображение</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className={styles.fileInput}
      />
    </div>
  );
};