interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const InputSearchIcon = ({ 
  size = 16,
  strokeColor = '#4A4A4A',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 16 17"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.75391" cy="7" r="6.5" stroke={strokeColor}/>
      <line x1="11.5729" y1="12.2029" x2="14.9079" y2="16.4496" stroke={strokeColor}/>
    </svg>
  );
};