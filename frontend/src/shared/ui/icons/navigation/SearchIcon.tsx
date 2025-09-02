// shared/ui/icons/common/SearchIcon.tsx
interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const SearchIcon = ({ 
  size = 21,
  fillColor = 'none',
  strokeColor = '#ECECEC',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size * (23 / 21)} // Сохраняем пропорции 21:23
      viewBox="0 0 21 23"
      fill={fillColor}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="9.60775"
        cy="9.60775"
        r="8.60775"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <line 
        x1="15.0951"
        y1="16.5543"
        x2="19.6725"
        y2="22.3831"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};