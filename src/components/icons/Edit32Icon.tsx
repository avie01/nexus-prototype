import React from 'react';

interface Edit32IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Edit32Icon: React.FC<Edit32IconProps> = ({ size = 32, className = '', style }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m2 26 14.5-14.5L18 13l-14.5 14.5L2 28z"/>
      <path d="m25.4 9c.8-.8.8-2 0-2.8L23 3.8c-.8-.8-2-.8-2.8 0l-3.7 3.7L19 10l6.4-1zM7 16l2 2-6 3 1-3 3-2z"/>
      <path fill="none" d="M0 0h32v32H0z"/>
    </svg>
  );
};