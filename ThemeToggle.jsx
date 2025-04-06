import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-300 focus:outline-none
        ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full
          bg-white transition-transform duration-300
          ${darkMode ? 'translate-x-6' : 'translate-x-1'}
        `}
      >
        {darkMode ? (
          <span className="absolute inset-0 flex items-center justify-center text-[10px]">
            🌙
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px]">
            ☀️
          </span>
        )}
      </span>
    </button>
  );
}

export default ThemeToggle; 