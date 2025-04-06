import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <BottomBar />
    </div>
  );
}

export default Layout; 