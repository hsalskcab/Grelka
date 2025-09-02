// shared/ui/icons/navigations/FavouriteIcon.tsx
interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const FavouriteIcon = ({ 
  size = 22,
  fillColor = 'none',
  strokeColor = '#ECECEC',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size * (20 / 22)} // Сохраняем пропорции 22:20
      viewBox="0 0 22 20"
      fill={fillColor}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 6.5C1 7.43072 1.23118 8.30745 1.63925 9.07589C3.23581 12.2045 7.22191 15.4426 11 18.4999C14.778 15.4426 18.7642 12.2045 20.3608 9.07585C20.7688 8.30742 21 7.43071 21 6.5C21 3.46243 18.5376 1 15.5 1C13.6398 1 11.9954 1.92345 11 3.33692C10.0046 1.92345 8.36016 1 6.5 1C3.46243 1 1 3.46243 1 6.5Z" 
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};