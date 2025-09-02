
interface IconProps {
  size?: number;
  fillColor?: string;
  className?: string;
  direction?: 'left' | 'right'; // Направление стрелки
}

export const ChevronHorizontal = ({ 
  size = 15,
  fillColor = '#7F7F7F',
  className,
  direction = 'right' // По умолчанию стрелка вправо
}: IconProps) => {
  const rotationStyle = direction === 'left' ? { transform: 'rotate(180deg)' } : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 23"
      fill="none"
      className={className}
      style={rotationStyle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M14.3135 0.673654C15.2288 1.57186 15.2288 3.02814 14.3135 3.92635L6.56237 11.5L14.3135 19.0737C15.2288 19.9719 15.2288 21.4281 14.3135 22.3263C13.3982 23.2246 11.9142 23.2246 10.9989 22.3263L-8.34465e-07 11.5L10.9989 0.673655C11.9142 -0.224551 13.3982 -0.224551 14.3135 0.673654Z" 
        fill={fillColor}
      />
    </svg>
  );
};