import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BsSearch, BsPersonPlus } from 'react-icons/bs';

function UserSearch({ onUserSelect, existingUsers = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/users/search?query=${query}`);
      // Filter out users that are already in the colab
      const filteredResults = response.data.filter(
        user => !existingUsers.includes(user._id)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchUsers(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
        />
        <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {searchTerm && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user._id}
                onClick={() => onUserSelect(user)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <img
                  src={user.image || createDefaultAvatar(user.name)}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium dark:text-white">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
                <BsPersonPlus className="ml-auto text-blue-500" />
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch; 