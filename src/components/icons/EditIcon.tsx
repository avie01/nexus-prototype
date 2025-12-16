import React from 'react';
import editSvg from '../../assets/edit.svg';

interface EditIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const EditIcon: React.FC<EditIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={editSvg}
      alt="Edit"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};