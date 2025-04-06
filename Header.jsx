import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createDefaultAvatar } from '../../utils/defaultAvatar';
import ThemeToggle from './ThemeToggle';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  
  const avatarSrc = user?.image || createDefaultAvatar(user?.name);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Spend
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Wise
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img 
                  src={avatarSrc}
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <span className="hidden md:block text-gray-700 dark:text-gray-200">
                  {user?.name}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile Settings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 