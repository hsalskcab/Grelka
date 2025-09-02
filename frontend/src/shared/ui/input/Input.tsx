import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Визуальное отображение ошибки
   */
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isError, disabled, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(
        styles.input,
        isError && styles.error,
        disabled && styles.disabled,
        className,
      )}
      {...props}
    />
  );
});