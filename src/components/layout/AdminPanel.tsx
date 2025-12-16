import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ApplicationIcon,
  AuthenticationIcon,
  DisplayIcon,
  FileExportIcon,
  ExtendersIcon,
  FeatureIcon,
  IconsIcon,
  Information32Icon,
} from '../icons';

interface AdminPanelProps {
  width: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ width }) => {
  
  const adminItems = [
    { to: '#', label: 'Application Settings', icon: ApplicationIcon },
    { to: '#', label: 'Authentication', icon: AuthenticationIcon },
    { to: '#', label: 'Display Metadata', icon: DisplayIcon },
    { to: '#', label: 'Export Settings', icon: FileExportIcon },
    { to: '#', label: 'Extenders', icon: ExtendersIcon },
    { to: '#', label: 'Feature Settings', icon: FeatureIcon },
    { to: '#', label: 'Icons', icon: IconsIcon },
    { to: '#', label: 'About', icon: Information32Icon },
  ];

  const baseClasses = "flex items-center space-x-3 px-4 py-3 text-sm font-normal transition-colors";
  const activeClasses = "bg-[#E0F3FE] text-[#0B77D8] border-l-[4px] border-[#0B77D8]";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent";

  return (
    <aside className="flex-shrink-0 bg-white flex flex-col border-l border-divider" style={{ width: `${width}px` }}>
      <div className="px-4 py-4 border-b border-divider">
        <h2 className="text-lg font-semibold text-gray-800">Admin</h2>
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col">
          {adminItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === 'Export Settings';
            
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={(e) => e.preventDefault()}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-[#0B77D8]' : ''}`} />
                <span className={isActive ? 'text-[#0B77D8]' : ''}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminPanel;