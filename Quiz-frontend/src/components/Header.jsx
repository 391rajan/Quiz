// File: components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="absolute top-0 w-full z-10 py-4 px-8 md:px-16 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-purple-600 rounded-full p-2">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm-2.5-5.5a.5.5 0 01.5-.5h3a.5.5 0 010 1H8.5a.5.5 0 01-.5-.5z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-gray-900">QuizMaster</span>
      </div>
      <nav className="hidden md:flex items-center space-x-8 text-gray-600 text-sm">
        <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <Link to="/quizzes" className="hover:text-purple-600 transition-colors">Quizzes</Link>
        <Link to="/create-quiz" className="hover:text-purple-600 transition-colors">Create</Link>
        <Link to="/plans" className="hover:text-purple-600 transition-colors">Plans</Link>
        {user && (
          <Link to="/dashboard" className="hover:text-purple-600 transition-colors">Dashboard</Link>
        )}
      </nav>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-600 text-sm hover:text-purple-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-600">
                {user.username ? user.username[0].toUpperCase() : 'U'}
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <div className="px-4 py-2 text-sm text-gray-700">Hello, {user.username}</div>
                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/auth" className="text-gray-600 text-sm hidden md:block">Login</Link>
            <Link to="/auth" className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;