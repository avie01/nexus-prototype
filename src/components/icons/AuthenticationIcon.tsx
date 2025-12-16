import React from 'react';
import authenticationSvg from '../../assets/authentication.svg';

interface AuthenticationIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AuthenticationIcon: React.FC<AuthenticationIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={authenticationSvg}
      alt="Authentication"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};