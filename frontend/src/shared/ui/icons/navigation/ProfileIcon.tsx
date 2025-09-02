// shared/ui/icons/navigation/ProfileIcon.tsx
interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const ProfileIcon = ({ 
  size = 20,
  fillColor = 'none',
  strokeColor = '#ECECEC',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size * 1.2} // Сохраняем пропорции 20:24
      viewBox="0 0 20 24"
      fill={fillColor}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.24609 14.333H11.7539C14.9454 14.3331 17.7286 16.4919 18.5283 19.5762L18.8896 23H1.11035L1.4707 19.5762C2.27031 16.4917 5.05455 14.3331 8.24609 14.333ZM10 1C12.3931 1 14.3328 2.93992 14.333 5.33301C14.333 7.72624 12.3932 9.66699 10 9.66699C7.60677 9.66699 5.66699 7.72624 5.66699 5.33301C5.66717 2.93992 7.60687 1 10 1Z" 
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};