import React from 'react';
import applicationSvg from '../../assets/application.svg';

interface ApplicationIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ApplicationIcon: React.FC<ApplicationIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={applicationSvg}
      alt="Application"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};