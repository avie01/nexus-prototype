import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GroupSecurityIcon,
  UsersIcon,
  ClipboardListIcon,
} from '../icons';

interface ReportsPanelProps {
  width: number;
}

const ReportsPanel: React.FC<ReportsPanelProps> = ({ width }) => {
  const reportItems = [
    { to: '/reports/privilege-reporting', label: 'Privilege reporting', icon: GroupSecurityIcon },
    { to: '#', label: 'Users & Groups', icon: UsersIcon, onClick: (e: React.MouseEvent) => e.preventDefault() },
    { to: '#', label: 'Workflows', icon: ClipboardListIcon, onClick: (e: React.MouseEvent) => e.preventDefault() },
  ];

  const baseClasses = "flex items-center space-x-3 px-4 py-3 text-sm font-normal transition-colors";
  const activeClasses = "bg-[#E0F3FE] text-[#0B77D8] border-l-[4px] border-[#0B77D8]";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent";

  return (
    <aside className="flex-shrink-0 bg-white flex flex-col border-l border-divider" style={{ width: `${width}px` }}>
      <div className="px-4 py-4 border-b border-divider">
        <h2 className="text-lg font-semibold text-gray-800">Reports</h2>
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col">
          {reportItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={item.onClick}
                className={({ isActive }) => {
                  const isDefaultActive = item.label === 'Privilege reporting' && !isActive;
                  const shouldShowActive = (isActive || isDefaultActive) && item.label !== 'Users & Groups' && item.label !== 'Workflows';
                  return `${baseClasses} ${shouldShowActive ? activeClasses : inactiveClasses}`;
                }}
              >
                {({ isActive }) => {
                  const isDefaultActive = item.label === 'Privilege reporting' && !isActive;
                  const shouldShowActive = (isActive || isDefaultActive) && item.label !== 'Users & Groups' && item.label !== 'Workflows';
                  return (
                    <>
                      <Icon size={20} className={`flex-shrink-0 ${shouldShowActive ? 'text-[#0B77D8]' : ''}`} />
                      <span className={shouldShowActive ? 'text-[#0B77D8]' : ''}>{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default ReportsPanel;