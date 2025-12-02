import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  DocumentIcon,
  CalendarIcon,
  GroupIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ClipboardListIcon,
  UsersIcon,
  BuildingIcon,
  FileMultipleIcon,
  ChevronRightIcon,
  Folders32Icon,
  Home32Icon,
  Star32Icon,
  Task32Icon,
  BareMetalServer32Icon,
} from '../icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { to: '/page2', label: 'Page2', icon: Folders32Icon },
    { to: '/page3', label: 'Page3', icon: Home32Icon },
    { to: '/page4', label: 'Page4', icon: Star32Icon },
    { to: '/page5', label: 'Page5', icon: Task32Icon },
    { to: '/page6', label: 'Page6', icon: BareMetalServer32Icon },
  ];

  const baseClasses = "flex items-center space-x-3 px-3 h-14 text-sm font-normal transition-colors";
  const activeClasses = "bg-[#E0F3FE] text-[#3560C1] border-l-[4px] border-[#3560C1]";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent";

  return (
    <aside className={`flex-shrink-0 bg-white flex flex-col border-r border-divider transition-all duration-300 ${collapsed ? 'w-[64px]' : 'w-[250px]'}`}>
      <div className="flex-grow">
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${collapsed ? 'justify-center px-0' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-[#3560C1]' : ''}`} />
                    {!collapsed && <span className={isActive ? 'text-[#3560C1]' : ''}>{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
          <button
            className={`${baseClasses} ${inactiveClasses} w-full`}
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 