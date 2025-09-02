import { useState, useRef, useCallback, InputHTMLAttributes } from 'react';
import { Input } from '@/shared/ui/input';
import { InputSearchIcon, CrossIcon } from '@/shared/ui/icons';
import styles from './styles.module.css';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  onFocus?: () => void;        // ← ДОБАВЛЯЕМ
  onBlur?: () => void;         // ← ДОБАВЛЯЕМ
}

export const SearchInput = ({
  value,
  onChange,
  onClear,
  onSearch,
  onFocus,                    // ← ДОБАВЛЯЕМ
  onBlur,                     // ← ДОБАВЛЯЕМ
  className,
  placeholder = 'Поиск по товарам и брендам',
  ...props
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();  // ← ВЫЗЫВАЕМ переданный обработчик фокуса
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();   // ← ВЫЗЫВАЕМ переданный обработчик блюра
  }, [onBlur]);

  const handleClear = useCallback(() => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  }, [onChange, onClear]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
    props.onKeyDown?.(e);
  }, [value, onSearch, props.onKeyDown]);

  // Иконка поиска скрывается только при фокусе
  const showSearchIcon = !isFocused;
  const showClearIcon = value.length > 0;

  const inputClassName = [
    styles.input,
    showSearchIcon && styles.withIcon,
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {showSearchIcon && (
          <div className={styles.searchIcon}>
            <InputSearchIcon size={16} strokeColor="#4A4A4A" />
          </div>
        )}
        
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}      // ← ИСПОЛЬЗУЕМ наш обработчик
          onBlur={handleBlur}        // ← ИСПОЛЬЗУЕМ наш обработчик
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
          {...props}
        />
        
        {showClearIcon && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
          >
            <CrossIcon size={24} strokeColor="#7F7F7F" fillColor="#7F7F7F" />
          </button>
        )}
      </div>
    </div>
  );
};