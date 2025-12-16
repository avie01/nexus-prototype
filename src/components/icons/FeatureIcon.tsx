import React from 'react';
import featureSvg from '../../assets/feature.svg';

interface FeatureIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={featureSvg}
      alt="Feature"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};