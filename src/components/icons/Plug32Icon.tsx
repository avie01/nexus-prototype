import React from 'react';

interface Plug32IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Plug32Icon: React.FC<Plug32IconProps> = ({ size = 32, className = '', style }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M25.414 11.414 22.586 8.586 21.5 7.5a3.482 3.482 0 0 0-2.45-1h-.1a3.485 3.485 0 0 0-2.45 1L15 9l4 4 1.5-1.5a3.48 3.48 0 0 0-.086-4.914z"/>
      <path d="m12.5 11.5-6 6a5.483 5.483 0 0 0 0 7.75 5.394 5.394 0 0 0 3.893 1.64A5.449 5.449 0 0 0 14.25 25.5l6-6zM11.427 22.573a2.52 2.52 0 0 1-3.595 0 2.552 2.552 0 0 1 0-3.595l4.5-4.5 3.595 3.595z"/>
      <path fill="none" d="M0 0h32v32H0z"/>
    </svg>
  );
};