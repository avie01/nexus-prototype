import React, { useState, useRef, useEffect } from 'react';
import { Badge } from './Badge';
import { CheckboxCheckedFilled32Icon, Checkbox32Icon, Close32Icon } from '../icons';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  secondaryText?: string;
  icon?: React.ComponentType<any>;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
  icon?: React.ComponentType<any>;
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
  showAsChips?: boolean;
  onClear?: () => void;
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
  onMultiChange,
  showAsChips = false,
  onClear
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
  
  // Find icon for the selected option
  const getOptionIcon = (optionValue: string) => {
    // First check if the option itself has an icon
    const option = allOptions.find(opt => opt.value === optionValue);
    if (option?.icon) {
      return option.icon;
    }
    
    // Then check if it belongs to a group with an icon
    if (groups.length > 0) {
      for (const group of groups) {
        if (group.options.some(opt => opt.value === optionValue)) {
          return group.icon;
        }
      }
    }
    return null;
  };

  const getClassificationVariant = (classification: string): 'default' | 'success' | 'danger' | 'warning' | 'info' | 'error' => {
    const lowerClassification = classification.toLowerCase();
    if (lowerClassification.includes('top secret')) return 'error';
    if (lowerClassification.includes('secret')) return 'danger';
    if (lowerClassification.includes('protected')) return 'info';
    if (lowerClassification.includes('official sensitive')) return 'warning';
    if (lowerClassification.includes('official')) return 'success';
    return 'default';
  };

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
      const displayOptions = selectedOptions.slice(0, 3);
      const remainingCount = selectedOptions.length - 3;
      const text = displayOptions.map(opt => opt.label).join(', ');
      return remainingCount > 0 ? `${text} +${remainingCount} more` : text;
    }
    return selectedOption?.label || placeholder;
  };

  const getDisplayContent = () => {
    const SelectedIcon = selectedOption && !multiple ? getOptionIcon(selectedOption.value) : null;
    
    if (showAsChips && !multiple && selectedOption) {
      return (
        <div className="flex items-center w-full">
          {SelectedIcon && (
            <SelectedIcon size={20} color="#276BB0" className="mr-2 flex-shrink-0" />
          )}
          <Badge variant={getClassificationVariant(selectedOption.label)}>
            {selectedOption.label}
          </Badge>
          {selectedOption.secondaryText && (
            <span 
              style={{
                marginLeft: 'auto',
                marginRight: '16px',
                color: '#707070',
                fontFamily: 'Noto Sans',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '24px'
              }}
            >
              {selectedOption.secondaryText}
            </span>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center w-full">
        {SelectedIcon && (
          <SelectedIcon size={20} color="#276BB0" className="mr-2 flex-shrink-0" />
        )}
        <span 
          style={isPlaceholder ? {
            color: '#707070',
            fontFamily: 'Noto Sans',
            fontSize: '14px',
            fontStyle: 'italic',
            fontWeight: '400',
            lineHeight: '24px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block'
          } : {
            color: '#32373F',
            fontFamily: 'Noto Sans',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '24px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block'
          }}
        >
          {getDisplayText()}
        </span>
        {selectedOption && selectedOption.secondaryText && (
          <span 
            style={{
              marginLeft: 'auto',
              marginRight: '16px',
              color: '#707070',
              fontFamily: 'Noto Sans',
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '24px'
            }}
          >
            {selectedOption.secondaryText}
          </span>
        )}
      </div>
    );
  };

  const isPlaceholder = multiple ? selectedOptions.length === 0 : !selectedOption;
  const hasValue = multiple ? selectedOptions.length > 0 : selectedOption;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      onMultiChange?.([]);
    } else {
      onChange?.('');
    }
    onClear?.();
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label 
        id={`${id}-label`}
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
          className={`w-full px-3 flex items-center justify-between cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} transition-all`}
          style={{
            border: '1px solid transparent',
            borderBottom: `1px solid ${invalid ? '#DA1E28' : '#ACACAC'}`,
            background: isOpen ? '#E8E8E8' : '#F5F5F5',
            height: '44px',
            borderRadius: '0px'
          }}
          onClick={handleToggle}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-haspopup="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
          onMouseEnter={(e) => {
            if (!disabled && !isOpen) {
              e.currentTarget.style.border = '1px solid transparent';
              e.currentTarget.style.borderBottom = '1px solid #3560C1';
              e.currentTarget.style.background = '#E8E8E8';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !isOpen) {
              e.currentTarget.style.border = '1px solid transparent';
              e.currentTarget.style.borderBottom = `1px solid ${invalid ? '#DA1E28' : '#ACACAC'}`;
              e.currentTarget.style.background = '#F5F5F5';
            }
          }}
        >
          <div className="flex-1 flex items-center">
            {isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter..."
                className="w-full bg-transparent outline-none border-none"
                style={{
                  color: '#32373F',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  border: 'none',
                  boxShadow: 'none'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                    setSearchTerm('');
                  }
                }}
              />
            ) : (
              getDisplayContent()
            )}
          </div>
          {hasValue && !disabled && (
            <button
              onClick={handleClear}
              className="flex items-center justify-center rounded transition-all"
              style={{
                width: '44px',
                height: '44px',
                padding: '0',
                border: 'none',
                background: 'transparent',
                marginRight: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <Close32Icon size={20} color="#525965" />
            </button>
          )}
          <div 
            style={{
              width: '20px',
              height: '20px',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23161616'%3e%3cpath d='M8 ${isOpen ? '5' : '11'}L3 ${isOpen ? '10' : '6'}l.7-.7L8 ${isOpen ? '6.4' : '9.6'}l4.3-4.3L13 ${isOpen ? '10' : '6'}z'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '20px',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </div>

        {isOpen && (
          <div 
            className="absolute left-0 right-0 z-50"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #3560C1',
              borderRadius: '4px',
              top: '100%',
              marginTop: '2px',
              maxHeight: '200px',
              overflowY: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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
                      const GroupIcon = group.icon;
                      
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
                            isSelected ? (
                              <CheckboxCheckedFilled32Icon size={20} color="#3560C1" className="mr-2 flex-shrink-0" />
                            ) : (
                              <Checkbox32Icon size={20} color="#525965" className="mr-2 flex-shrink-0" />
                            )
                          )}
                          {GroupIcon && (
                            <GroupIcon size={20} color="#276BB0" className="mr-2 flex-shrink-0" />
                          )}
                          {showAsChips ? (
                            <Badge variant={getClassificationVariant(option.label)}>
                              {option.label}
                            </Badge>
                          ) : (
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {option.label}
                              </div>
                              {option.secondaryText && (
                                <div style={{ 
                                  fontSize: '12px', 
                                  color: '#707070', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  whiteSpace: 'nowrap' 
                                }}>
                                  {option.secondaryText}
                                </div>
                              )}
                            </div>
                          )}
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
                const OptionIcon = option.icon;
                
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
                      isSelected ? (
                        <CheckboxCheckedFilled32Icon size={16} color="#3560C1" className="mr-2 flex-shrink-0" />
                      ) : (
                        <Checkbox32Icon size={16} color="#525965" className="mr-2 flex-shrink-0" />
                      )
                    )}
                    {OptionIcon && (
                      <OptionIcon size={20} color="#276BB0" className="mr-2 flex-shrink-0" />
                    )}
                    {showAsChips ? (
                      <Badge variant={getClassificationVariant(option.label)}>
                        {option.label}
                      </Badge>
                    ) : (
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {option.label}
                        </div>
                        {option.secondaryText && (
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#707070', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap' 
                          }}>
                            {option.secondaryText}
                          </div>
                        )}
                      </div>
                    )}
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