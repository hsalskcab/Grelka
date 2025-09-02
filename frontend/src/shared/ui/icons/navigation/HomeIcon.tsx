// shared/ui/icons/navigation/HomeIcon.tsx
interface IconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const HomeIcon = ({ 
  size = 22,
  fillColor = 'var(--color-whyte)',
  strokeColor = 'var(--color-dark)',
  className
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="#ECECEC"
      className={className}
    >
      <path 
        d="M0 7.84184C0 7.39036 0.229797 6.96679 0.616699 6.70515L10.15 0.258099C10.6589 -0.0860335 11.3411 -0.0860327 11.85 0.2581L21.3833 6.70515C21.7702 6.96679 22 7.39036 22 7.84184V19.9078C22 21.0633 21.015 22 19.8 22H2.2C0.984974 22 0 21.0633 0 19.9078V7.84184Z" 
        fill={fillColor}
      />
      <line 
        x1="6.10938" 
        y1="17.832" 
        x2="15.8872" 
        y2="17.832" 
        stroke={strokeColor}
      />
    </svg>
  );
};