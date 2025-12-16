import React from 'react';
import displaySvg from '../../assets/display.svg';

interface DisplayIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const DisplayIcon: React.FC<DisplayIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={displaySvg}
      alt="Display"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};