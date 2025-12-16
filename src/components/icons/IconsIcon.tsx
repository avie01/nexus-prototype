import React from 'react';
import iconsSvg from '../../assets/icons.svg';

interface IconsIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconsIcon: React.FC<IconsIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={iconsSvg}
      alt="Icons"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};