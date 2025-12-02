import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { XIcon } from './icons/XIcon';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Add type...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(selectedValues.length);
  const [showTooltip, setShowTooltip] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Filter available options based on search term and already selected values
  const availableOptions = options.filter(option => 
    !selectedValues.includes(option) && 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a new document type
  const handleAddType = (type: string) => {
    if (!selectedValues.includes(type)) {
      onSelectionChange([...selectedValues, type]);
    }
    setSearchTerm('');
    setInputValue('');
    setIsOpen(false);
  };

  // Handle removing a document type
  const handleRemoveType = (type: string) => {
    onSelectionChange(selectedValues.filter(t => t !== type));
  };

  // Handle input change for search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
    setIsOpen(true);
  };

  // Handle key press for adding types
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      const exactMatch = availableOptions.find(option => 
        option.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        handleAddType(exactMatch);
      } else if (availableOptions.length > 0) {
        handleAddType(availableOptions[0]);
      }
    } else if (e.key === 'Backspace' && !searchTerm && selectedValues.length > 0) {
      handleRemoveType(selectedValues[selectedValues.length - 1]);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!containerRef.current) return { top: 0, left: 0, width: 'auto' };
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dropdownHeight = Math.min(availableOptions.length * 32, 192); // 32px per option, max 192px
    
    // Check if dropdown would go below viewport
    const wouldGoBelow = rect.bottom + dropdownHeight > viewportHeight;
    const top = wouldGoBelow ? rect.top - dropdownHeight - 4 : rect.bottom + 4;
    
    // Check if dropdown would go outside viewport horizontally
    const dropdownWidth = Math.max(rect.width, 200);
    const wouldGoRight = rect.left + dropdownWidth > viewportWidth;
    const left = wouldGoRight ? Math.max(0, viewportWidth - dropdownWidth - 8) : rect.left;
    
    return {
      top: Math.max(8, top),
      left: Math.max(8, left),
      width: Math.min(dropdownWidth, viewportWidth - 16)
    };
  };

  // Responsive: calculate how many tags fit in one line
  useLayoutEffect(() => {
    if (expanded) {
      setVisibleCount(selectedValues.length);
      return;
    }
    if (!inputContainerRef.current) return;
    const containerWidth = inputContainerRef.current.offsetWidth;
    let usedWidth = 0;
    let count = 0;
    for (let i = 0; i < selectedValues.length; i++) {
      const tag = tagRefs.current[i];
      if (tag) {
        const tagWidth = tag.offsetWidth + 4; // 4px gap
        if (usedWidth + tagWidth > containerWidth - 60) break; // 60px for input min width/+N more
        usedWidth += tagWidth;
        count++;
      }
    }
    setVisibleCount(selectedValues.length > 0 ? Math.max(1, count) : 0);
  }, [selectedValues, inputValue, expanded]);

  // Collapse expanded view when clicking outside
  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: '100%', maxWidth: 480 }}>
      <div
        className="h-[36px] px-3 flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 cursor-text bg-[#F5F5F5] border-b border-[#ACACAC]"
        style={{ width: '100%', minWidth: 0, minHeight: expanded ? 72 : 36, height: expanded ? 72 : 36, transition: 'height 0.2s' }}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div
          className={`flex items-center gap-1 w-full overflow-hidden ${expanded ? 'flex-wrap' : ''}`}
          style={{ flexWrap: expanded ? 'wrap' : 'nowrap', minWidth: 0, maxHeight: expanded ? 72 : 36, transition: 'max-height 0.2s' }}
          ref={inputContainerRef}
        >
          {/* Tags */}
          {(expanded ? selectedValues : selectedValues.slice(0, visibleCount)).map((type, i) => (
            <span
              key={type}
              ref={el => tagRefs.current[i] = el}
              className="inline-flex items-center text-xs font-medium rounded px-2 py-0.5 bg-blue-100 text-blue-800 whitespace-nowrap"
            >
              {type}
              <button
                type="button"
                className="ml-1 hover:text-blue-600 focus:outline-none"
                onClick={e => {
                  e.stopPropagation();
                  handleRemoveType(type);
                }}
                aria-label={`Remove ${type}`}
              >
                <XIcon size={12} />
              </button>
            </span>
          ))}
          {/* +N more badge */}
          {!expanded && selectedValues.length > visibleCount && (
            <span
              className="inline-flex items-center text-xs font-medium rounded px-2 py-0.5 bg-gray-200 text-gray-700 cursor-pointer relative"
              style={{ maxWidth: 60 }}
              onClick={e => {
                e.stopPropagation();
                setExpanded(true);
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              +{selectedValues.length - visibleCount} more
              {/* Tooltip (optional, keep for hover) */}
              {showTooltip && (
                <div className="absolute z-50 left-0 top-full mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 text-xs whitespace-pre-wrap min-w-[120px] max-w-[240px]" style={{ whiteSpace: 'normal' }}>
                  {selectedValues.map(type => (
                    <div key={type} className="flex items-center gap-1 mb-1 last:mb-0">
                      <span>{type}</span>
                      <button
                        type="button"
                        className="hover:text-blue-600 focus:outline-none"
                        onClick={e => {
                          e.stopPropagation();
                          handleRemoveType(type);
                          setShowTooltip(false);
                        }}
                        aria-label={`Remove ${type}`}
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </span>
          )}
          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[60px] text-sm border-none outline-none bg-transparent"
            style={{ height: '28px', minWidth: selectedValues.length === 0 ? '120px' : '60px' }}
          />
        </div>
      </div>
      {/* Dropdown */}
      {isOpen && availableOptions.length > 0 && (
        <div className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto" style={getDropdownPosition()}>
          {availableOptions.map((option) => (
            <div
              key={option}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAddType(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 