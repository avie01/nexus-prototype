import { Link } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '../icons';
import logo from '../../assets/Nexus-logo.png';

const Header = () => {
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
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded" aria-label="User menu for Scott Marshall" aria-expanded="false" aria-haspopup="true">
              <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-normal" aria-hidden="true">
                SM
              </div>
              <span className="text-sm font-medium text-gray-700">Scott Marshall</span>
              <ChevronDownIcon size={16} className="text-gray-500" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 