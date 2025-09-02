
interface IconProps {
  size?: number;
  fillColor?: string;
  className?: string;
}

export const ChevronVertical = ({ 
  size = 10,
  fillColor = '#ECECEC',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 7"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M0.292893 0.292894C0.683417 -0.0976309 1.31658 -0.0976309 1.70711 0.292894L5 3.6L8.29289 0.292894C8.68342 -0.0976312 9.31658 -0.0976312 9.70711 0.292894C10.0976 0.683417 10.0976 1.31658 9.70711 1.70711L5 6.39991L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292894Z" 
        fill={fillColor}
      />
    </svg>
  );
};