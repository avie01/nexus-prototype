import React, { useState, useRef, useEffect } from 'react';
import { Badge } from './Badge';
import { CheckboxCheckedFilled32Icon, Checkbox32Icon, Close32Icon, ChevronUp32Icon } from '../icons';

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

interface DropdownTab {
  id: string;
  label: string;
}

interface CarbonDropdownProps {
  id: string;
  label?: string;
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
  tabs?: DropdownTab[];
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
  onClear,
  tabs
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');
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
    // If tabs are enabled, prefix the value with the active tab id
    const finalValue = tabs ? `${activeTab}:${optionValue}` : optionValue;

    if (multiple) {
      // For tabbed multi-select, check if this exact tab:value combo exists
      const newValues = values.includes(finalValue)
        ? values.filter(v => v !== finalValue)
        : [...values, finalValue];
      onMultiChange?.(newValues);
    } else {
      onChange?.(finalValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Helper to parse tabbed values
  const parseTabValue = (val: string) => {
    if (tabs && val.includes(':')) {
      const [tabId, ...rest] = val.split(':');
      const optionValue = rest.join(':');
      const tab = tabs.find(t => t.id === tabId);
      return { tabId, tabLabel: tab?.label || tabId, optionValue };
    }
    return { tabId: '', tabLabel: '', optionValue: val };
  };

  const getDisplayText = () => {
    if (multiple) {
      if (selectedOptions.length === 0 && (!tabs || values.length === 0)) return placeholder;

      if (tabs) {
        // For tabbed multi-select, parse values to get tab labels
        const displayValues = values.slice(0, 3).map(val => {
          const { tabLabel, optionValue } = parseTabValue(val);
          const opt = allOptions.find(o => o.value === optionValue);
          return tabLabel ? `${tabLabel}: ${opt?.label || optionValue}` : (opt?.label || optionValue);
        });
        const remainingCount = values.length - 3;
        const text = displayValues.join(', ');
        return remainingCount > 0 ? `${text} +${remainingCount} more` : text;
      }

      const displayOptions = selectedOptions.slice(0, 3);
      const remainingCount = selectedOptions.length - 3;
      const text = displayOptions.map(opt => opt.label).join(', ');
      return remainingCount > 0 ? `${text} +${remainingCount} more` : text;
    }

    if (tabs && value) {
      const { tabLabel, optionValue } = parseTabValue(value);
      const opt = allOptions.find(o => o.value === optionValue);
      return tabLabel ? `${tabLabel}: ${opt?.label || optionValue}` : (opt?.label || optionValue);
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
      {label && (
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
      )}

      <div className="relative">
        <div
          className={`w-full px-3 flex items-center justify-between cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} transition-all`}
          style={{
            border: isOpen ? '2px solid #3560C1' : '1px solid transparent',
            borderBottom: isOpen ? '2px solid #3560C1' : `1px solid ${invalid ? '#DA1E28' : '#ACACAC'}`,
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
          <div className="flex-1 flex items-center" style={{ border: 'none', outline: 'none' }}>
            {isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter..."
                className="w-full bg-transparent outline-none border-none dropdown-filter-input"
                style={{
                  color: '#32373F',
                  fontFamily: 'Noto Sans',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none'
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
          {isOpen ? (
            <ChevronUp32Icon size={20} color="#161616" />
          ) : (
            <div 
              style={{
                width: '20px',
                height: '20px',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23161616'%3e%3cpath d='M8 11L3 6l.7-.7L8 9.6l4.3-4.3L13 6z'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '20px'
              }}
            />
          )}
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
              maxHeight: tabs ? '250px' : '200px',
              overflowY: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {tabs && tabs.length > 0 && (
              <div
                className="flex border-b sticky top-0 bg-white z-10"
                style={{ borderColor: '#e0e0e0' }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab.id);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: activeTab === tab.id ? '#3560C1' : '#525965',
                      borderBottom: activeTab === tab.id ? '2px solid #3560C1' : '2px solid transparent',
                      background: activeTab === tab.id ? '#f0f5ff' : 'transparent',
                      fontFamily: 'Noto Sans',
                      fontSize: '14px',
                      fontWeight: activeTab === tab.id ? '600' : '400'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
            {groups.length > 0 ? (
              groups.map((group, groupIndex) => {
                const enabledOptions = group.options.filter(opt => !opt.disabled);
                const allGroupSelected = multiple && enabledOptions.length > 0 && enabledOptions.every(opt => values.includes(opt.value));
                const handleSelectAllGroup = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (!multiple || !onMultiChange) return;
                  if (allGroupSelected) {
                    // Deselect all from this group
                    const newValues = values.filter(v => !enabledOptions.some(opt => opt.value === v));
                    onMultiChange(newValues);
                  } else {
                    // Select all enabled options from this group
                    const groupValues = enabledOptions.map(opt => opt.value);
                    const newValues = [...new Set([...values, ...groupValues])];
                    onMultiChange(newValues);
                  }
                };

                return (
                <div key={groupIndex}>
                  <div
                    className="px-3 py-2 border-b flex items-center cursor-pointer"
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
                    onClick={multiple && enabledOptions.length > 0 ? handleSelectAllGroup : undefined}
                  >
                    {multiple && enabledOptions.length > 0 && (
                      allGroupSelected ? (
                        <CheckboxCheckedFilled32Icon size={20} color="#3560C1" className="mr-2 flex-shrink-0" />
                      ) : (
                        <Checkbox32Icon size={20} color="#525965" className="mr-2 flex-shrink-0" />
                      )
                    )}
                    <span>{group.label}</span>
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
                );
              })
            ) : (
              filteredOptions.map((option) => {
                // For tabbed dropdowns, check if the tab:value combo is selected
                const tabbedValue = tabs ? `${activeTab}:${option.value}` : option.value;
                const isSelected = multiple
                  ? values.includes(tabbedValue)
                  : (tabs ? value === tabbedValue : value === option.value);
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