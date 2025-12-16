import React from 'react';
import fileExportSvg from '../../assets/file-export.svg';

interface FileExportIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const FileExportIcon: React.FC<FileExportIconProps> = ({ size = 32, className = '', style }) => {
  return (
    <img 
      src={fileExportSvg}
      alt="File Export"
      width={size} 
      height={size} 
      className={className}
      style={style}
    />
  );
};