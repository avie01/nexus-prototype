import React from 'react';

interface Export32IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Export32Icon: React.FC<Export32IconProps> = ({ size = 32, className = '', style }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4z"/>
      <path d="m11 14 1.41 1.41L15 12.83V24h2V12.83l2.59 2.58L21 14l-5-5-5 5z"/>
      <path d="M4 8h11V6H6V2H4v4a2 2 0 0 0 2 2z"/>
      <path d="M26 2v4h-9v2h11a2 2 0 0 0 2-2V2z"/>
      <path fill="none" d="M0 0h32v32H0z"/>
    </svg>
  );
};