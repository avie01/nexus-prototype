import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full items-center rounded-none border-b-2 border-gray-300 bg-gray-100/50 px-4 py-2 text-base text-gray-900 placeholder:text-placeholder-gray placeholder:text-sm placeholder:italic',
          'hover:border-blue-600',
          'focus:border-blue-600 focus:bg-white focus:outline-none',
          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400',
          'read-only:cursor-default read-only:border-gray-200 read-only:bg-gray-100',
          'data-[invalid]:border-red-500 data-[invalid]:bg-white',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input }; 