import React from 'react';
import { CogIcon, ArrowRightIcon } from './icons';

interface TeamCardProps {
  title: string;
  description: string;
  tag: string;
  initials: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ title, description, tag, initials }) => {
  return (
    <div className="bg-white border border-gray-200/80 rounded-lg p-6 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-3 text-gray-400">
          <CogIcon size={20} className="hover:text-gray-600" />
          <ArrowRightIcon size={20} className="hover:text-gray-600" />
        </div>
      </div>
      <div className="mt-2">
        <span className="inline-block bg-[#E4F7E4] text-[#31622C] text-xs font-medium px-2.5 py-1 rounded">
          {tag}
        </span>
      </div>
      <p className="mt-4 text-gray-500 text-sm leading-relaxed flex-grow">
        {description}
      </p>
      <div className="mt-6">
        <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      </div>
    </div>
  );
}; 