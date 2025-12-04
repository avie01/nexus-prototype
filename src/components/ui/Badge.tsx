import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'error';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseClasses = 'transition-colors';
  
  const variantClasses = {
    default: 'border-gray-300 bg-white text-gray-800',
    success: 'border-gray-300 bg-white text-gray-800',
    danger: 'border-transparent text-black',
    warning: 'border-gray-300 bg-white text-gray-800',
    info: 'border-transparent text-white',
    error: 'border-transparent text-white',
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        display: 'inline-flex',
        padding: '4px 6px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        height: '24px',
        borderRadius: '4px',
        fontFamily: '"Noto Sans"',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '20px',
        ...(variant === 'default' || variant === 'success' || variant === 'warning' ? {
          border: '1px solid #D1D1D1',
          background: '#FFF'
        } : variant === 'info' ? {
          background: '#5A80B9',
          color: '#ffffff'
        } : variant === 'danger' ? {
          background: '#DEBAB8',
          color: '#000000'
        } : variant === 'error' ? {
          background: '#E93323',
          color: '#ffffff'
        } : {})
      }}
      {...props}
    />
  );
}

export { Badge }; 