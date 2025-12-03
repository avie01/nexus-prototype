import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DashboardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Folders32Icon,
  SearchLocate32Icon,
  Home32Icon,
  Task32Icon,
  Star32Icon,
  ReportData32Icon,
  SettingsAdjust32Icon,
} from '../icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { to: '/dashboard', label: 'Global', icon: Folders32Icon },
    { to: '/dashboard', label: 'My Home', icon: Home32Icon },
    { to: '/dashboard', label: 'Handy', icon: Star32Icon },
    { to: '/dashboard', label: 'Tasks', icon: Task32Icon },
    { to: '/dashboard', label: 'Query', icon: SearchLocate32Icon },
    { to: '/dashboard', label: 'Reporting', icon: ReportData32Icon },
    { to: '/dashboard', label: 'Manage', icon: SettingsAdjust32Icon },
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
            const isActiveItem = item.label === 'Reporting';
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`${baseClasses} ${isActiveItem ? activeClasses : inactiveClasses} ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <>
                  <Icon size={20} className={`flex-shrink-0 ${isActiveItem ? 'text-[#3560C1]' : ''}`} />
                  {!collapsed && <span className={isActiveItem ? 'text-[#3560C1]' : ''}>{item.label}</span>}
                </>
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