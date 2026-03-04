import React from 'react';

interface ViewToggleProps {
  view: 'table' | 'charts';
  onViewChange: (view: 'table' | 'charts') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onViewChange('table')}
        className={`relative px-4 py-2 text-base font-medium transition-colors ${
          view === 'table'
            ? 'text-[#3560C1]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Table
        {view === 'table' && (
          <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#3560C1] rounded-t-sm" />
        )}
      </button>
      <button
        onClick={() => onViewChange('charts')}
        className={`relative px-4 py-2 text-base font-medium transition-colors ${
          view === 'charts'
            ? 'text-[#3560C1]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Charts
        {view === 'charts' && (
          <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#3560C1] rounded-t-sm" />
        )}
      </button>
    </div>
  );
};

export default ViewToggle;
