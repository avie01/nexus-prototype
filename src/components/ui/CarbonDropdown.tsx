import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

interface CarbonDropdownProps {
  id: string;
  label: string;
  placeholder?: string;
  options?: DropdownOption[];
  groups?: DropdownGroup[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  helperText?: string;
  multiple?: boolean;
  values?: string[];
  onMultiChange?: (values: string[]) => void;
}

const CarbonDropdown: React.FC<CarbonDropdownProps> = ({
  id,
  label,
  placeholder = 'Choose an option',
  options = [],
  groups = [],
  value,
  onChange,
  disabled = false,
  invalid = false,
  helperText,
  multiple = false,
  values = [],
  onMultiChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allOptions = groups.length > 0 
    ? groups.flatMap(group => group.options)
    : options;

  const filteredOptions = allOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = allOptions.find(option => option.value === value);
  const selectedOptions = allOptions.filter(option => values.includes(option.value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = values.includes(optionValue)
        ? values.filter(v => v !== optionValue)
        : [...values, optionValue];
      onMultiChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      if (selectedOptions.length === 0) return placeholder;
      return selectedOptions.map(opt => opt.label).join(', ');
    }
    return selectedOption?.label || placeholder;
  };

  const isPlaceholder = multiple ? selectedOptions.length === 0 : !selectedOption;

  return (
    <div className="relative" ref={dropdownRef}>
      <label 
        htmlFor={id} 
        className="block mb-1" 
        style={{ 
          color: '#32373F', 
          fontFamily: 'Noto Sans', 
          fontSize: '14px', 
          fontWeight: '600', 
          lineHeight: '21px' 
        }}
      >
        {label}
      </label>
      
      <div className="relative">
        <div
          className={`w-full px-3 flex items-center justify-between cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          style={{
            borderBottom: `1px solid ${invalid ? '#DA1E28' : '#ACACAC'}`,
            background: '#F5F5F5',
            height: '44px',
            borderRadius: '0px'
          }}
          onClick={handleToggle}
        >
          <div className="flex-1 flex items-center">
            {isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter..."
                className="w-full bg-transparent outline-none"
                style={{
                  color: '#32373F',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                    setSearchTerm('');
                  }
                }}
              />
            ) : (
              <span 
                style={isPlaceholder ? {
                  color: '#707070',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  fontWeight: '400',
                  lineHeight: '24px'
                } : {
                  color: '#32373F',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px'
                }}
              >
                {getDisplayText()}
              </span>
            )}
          </div>
          <div 
            style={{
              width: '1rem',
              height: '1rem',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23161616'%3e%3cpath d='M8 ${isOpen ? '5' : '11'}L3 ${isOpen ? '10' : '6'}l.7-.7L8 ${isOpen ? '6.4' : '9.6'}l4.3-4.3L13 ${isOpen ? '10' : '6'}z'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '1rem',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </div>

        {isOpen && (
          <div 
            className="absolute left-0 right-0 z-50 shadow-lg border"
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#d1d1d1',
              borderRadius: '4px',
              top: '100%',
              marginTop: '2px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}
          >
            {groups.length > 0 ? (
              groups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div 
                    className="px-3 py-2 border-b"
                    style={{
                      backgroundColor: '#f4f4f4',
                      borderColor: '#e0e0e0',
                      color: '#32373F',
                      fontFamily: 'Noto Sans',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.32px'
                    }}
                  >
                    {group.label}
                  </div>
                  {group.options
                    .filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((option) => {
                      const isSelected = multiple ? values.includes(option.value) : value === option.value;
                      const isDisabled = option.disabled;
                      
                      return (
                        <div
                          key={option.value}
                          className={`px-3 py-2 cursor-pointer flex items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} ${isSelected ? 'bg-blue-50' : ''}`}
                          style={{
                            color: isSelected ? '#3560C1' : '#32373F',
                            fontFamily: 'Noto Sans',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '18.2px'
                          }}
                          onClick={() => !isDisabled && handleOptionSelect(option.value)}
                        >
                          {multiple && (
                            <div
                              className="mr-2 flex-shrink-0"
                              style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid #d1d1d1',
                                borderRadius: '2px',
                                backgroundColor: isSelected ? '#3560C1' : 'transparent',
                                borderColor: isSelected ? '#3560C1' : '#d1d1d1',
                                backgroundImage: isSelected ? 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23ffffff\'%3e%3cpath d=\'M13.1 4.7L6.5 11.3 2.9 7.7l.7-.7 2.9 2.9 6.1-6.1.5.9z\'/%3e%3c/svg%3e")' : 'none',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: '12px'
                              }}
                            />
                          )}
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                            {option.label}
                          </span>
                          {!multiple && isSelected && (
                            <div
                              style={{
                                width: '16px',
                                height: '16px',
                                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%233560C1\'%3e%3cpath d=\'M13.1 4.7L6.5 11.3 2.9 7.7l.7-.7 2.9 2.9 6.1-6.1.5.9z\'/%3e%3c/svg%3e")',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: '16px'
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              ))
            ) : (
              filteredOptions.map((option) => {
                const isSelected = multiple ? values.includes(option.value) : value === option.value;
                const isDisabled = option.disabled;
                
                return (
                  <div
                    key={option.value}
                    className={`px-3 py-2 cursor-pointer flex items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'} ${isSelected ? 'bg-blue-50' : ''}`}
                    style={{
                      color: isSelected ? '#3560C1' : '#32373F',
                      fontFamily: 'Noto Sans',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '18.2px'
                    }}
                    onClick={() => !isDisabled && handleOptionSelect(option.value)}
                  >
                    {multiple && (
                      <div
                        className="mr-2 flex-shrink-0"
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #d1d1d1',
                          borderRadius: '2px',
                          backgroundColor: isSelected ? '#3560C1' : 'transparent',
                          borderColor: isSelected ? '#3560C1' : '#d1d1d1',
                          backgroundImage: isSelected ? 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23ffffff\'%3e%3cpath d=\'M13.1 4.7L6.5 11.3 2.9 7.7l.7-.7 2.9 2.9 6.1-6.1.5.9z\'/%3e%3c/svg%3e")' : 'none',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '12px'
                        }}
                      />
                    )}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {option.label}
                    </span>
                    {!multiple && isSelected && (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%233560C1\'%3e%3cpath d=\'M13.1 4.7L6.5 11.3 2.9 7.7l.7-.7 2.9 2.9 6.1-6.1.5.9z\'/%3e%3c/svg%3e")',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: '16px'
                        }}
                      />
                    )}
                  </div>
                );
              })
            )}
            
            {filteredOptions.length === 0 && (
              <div 
                className="px-3 py-2 text-center"
                style={{
                  color: '#707070',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}
              >
                No options found
              </div>
            )}
          </div>
        )}
      </div>
      
      {helperText && (
        <div 
          className="mt-1"
          style={{
            color: invalid ? '#DA1E28' : '#707070',
            fontFamily: 'Noto Sans',
            fontSize: '12px',
            lineHeight: '16px'
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default CarbonDropdown;