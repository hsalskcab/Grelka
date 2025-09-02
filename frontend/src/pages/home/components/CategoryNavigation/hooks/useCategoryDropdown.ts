import { useState, useEffect, useRef } from 'react';
import { Gender } from '../lib/types';

export const useCategoryDropdown = () => {
  const [activeGender, setActiveGender] = useState<Gender | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (gender: Gender) => {
    setActiveGender((current) => (current === gender ? null : gender));
  };

  const closeDropdown = () => {
    setActiveGender(null);
  };

  // Эффект для закрытия по клику вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    // Добавляем обработчик только если дропдаун открыт
    if (activeGender) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Убираем обработчик при размонтировании или закрытии
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeGender]); // Зависимость от activeGender

  return {
    activeGender,
    isDropdownOpen: activeGender !== null,
    toggleDropdown,
    closeDropdown,
    dropdownRef, // Возвращаем ref для использования в компоненте
  };
};