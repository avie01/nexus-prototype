import React from 'react';

interface ViewToggleProps {
  view: 'table' | 'charts';
  onViewChange: (view: 'table' | 'charts') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
          view === 'table'
            ? 'bg-white text-[#3560C1] shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="2" width="14" height="2" rx="0.5" />
          <rect x="1" y="6" width="14" height="2" rx="0.5" />
          <rect x="1" y="10" width="14" height="2" rx="0.5" />
          <rect x="1" y="14" width="14" height="1" rx="0.5" />
        </svg>
        Table
      </button>
      <button
        onClick={() => onViewChange('charts')}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
          view === 'charts'
            ? 'bg-white text-[#3560C1] shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="8" width="3" height="7" rx="0.5" />
          <rect x="5.5" y="4" width="3" height="11" rx="0.5" />
          <rect x="10" y="1" width="3" height="14" rx="0.5" />
        </svg>
        Charts
      </button>
    </div>
  );
};

export default ViewToggle;
