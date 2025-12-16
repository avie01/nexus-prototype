import React from 'react';
import extendersSvg from '../../assets/Extenders.svg';

interface ExtendersIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ExtendersIcon: React.FC<ExtendersIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={extendersSvg}
      alt="Extenders"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};