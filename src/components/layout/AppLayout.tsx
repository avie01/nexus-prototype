import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ReportsPanel from './ReportsPanel';
import AdminPanel from './AdminPanel';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {isAdminPage ? (
          <AdminPanel width={400} />
        ) : (
          <ReportsPanel width={400} />
        )}
        <main className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: '#EDF1F5' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;