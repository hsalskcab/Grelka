// shared/ui/icons/navigation/ChatIcon.tsx
interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const ChatIcon = ({ 
  size = 22,
  fillColor = 'none',
  strokeColor = '#ECECEC',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill={fillColor}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5.27826 20.2L10.287 15.1913H18.2C19.3046 15.1913 20.2 14.2959 20.2 13.1913V3C20.2 1.89543 19.3046 1 18.2 1H3C1.89543 1 1 1.89543 1 3V13.1913C1 14.2959 1.89543 15.1913 3 15.1913H5.27826V20.2Z" 
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};