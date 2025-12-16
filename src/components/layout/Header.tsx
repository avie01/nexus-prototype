import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '../icons';
import logo from '../../assets/Nexus-logo.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAdminClick = () => {
    navigate('/admin');
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200/80" style={{ borderTop: '4px solid #3560C1' }}>
      <div className="flex items-center justify-between px-3 py-3">
        <Link to="/" className="flex items-center" aria-label="Home">
          <img src={logo} alt="Nexus application logo" className="w-40 h-6" />
        </Link>
        <div className="flex items-center space-x-5">
          <button aria-label="Notifications" className="p-1 hover:bg-gray-100 rounded">
            <BellIcon size={20} className="text-gray-500 hover:text-gray-700" aria-hidden="true" />
          </button>
          <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded" 
              aria-label="User menu for Scott Marshall" 
              aria-expanded={isDropdownOpen} 
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-normal" aria-hidden="true">
                SM
              </div>
              <span className="text-sm font-medium text-gray-700">Scott Marshall</span>
              <ChevronDownIcon size={16} className="text-gray-500" aria-hidden="true" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 top-full">
                <button
                  onClick={handleAdminClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 