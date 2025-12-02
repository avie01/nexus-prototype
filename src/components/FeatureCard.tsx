import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  to: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, to }) => {
  return (
    <Link
      to={to}
      className="flex flex-col bg-white border border-gray-200/80 rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-200 group"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-auto pt-4 flex justify-end">
        <span className="text-sm font-medium text-blue-600 group-hover:underline">
          Open &rarr;
        </span>
      </div>
    </Link>
  );
}; 