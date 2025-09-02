interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const CrossIcon = ({ 
  size = 28,
  strokeColor = '#7F7F7F',
  fillColor = '#7F7F7F',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="13.5" stroke={strokeColor}/>
      <path 
        d="M18.5368 8.25105C18.8715 7.91632 19.4142 7.91632 19.7489 8.25105C20.0837 8.58579 20.0837 9.1285 19.7489 9.46323L15.2122 14L19.7489 18.5368C20.0837 18.8715 20.0837 19.4142 19.7489 19.7489C19.4142 20.0837 18.8715 20.0837 18.5368 19.7489L14 15.2122L9.46324 19.7489C9.1285 20.0837 8.58579 20.0837 8.25105 19.7489C7.91632 19.4142 7.91632 18.8715 8.25105 18.5368L12.7878 14L8.25105 9.46323C7.91632 9.1285 7.91632 8.58579 8.25105 8.25105C8.58579 7.91632 9.1285 7.91632 9.46323 8.25105L14 12.7878L18.5368 8.25105Z" 
        fill={fillColor}
      />
    </svg>
  );
};