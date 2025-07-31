import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <Link to="/" className="hover:text-purple-600 transition-colors">QuizMaster</Link>
        <Link to="#" className="hover:text-purple-600 transition-colors">About</Link>
        <Link to="#" className="hover:text-purple-600 transition-colors">Create</Link>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Both login and signup buttons now correctly link to the /auth route */}
        <Link to="/auth" className="text-gray-600 text-sm hidden md:block">Login</Link>
        <Link to="/auth" className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md">Sign up</Link>
      </div>
    </header>
  );
};

export default Header;