import React from 'react';
import { IconProps } from './types';

const ChevronUp32Icon: React.FC<IconProps> = ({ 
  size = 32, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 10L8 18L9.4 19.4L16 12.8L22.6 19.4L24 18L16 10Z"
      fill={color}
    />
  </svg>
);

export default ChevronUp32Icon;