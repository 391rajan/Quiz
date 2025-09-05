import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      {/* Left side with animated background and welcome text */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-800 text-white p-12 items-center relative overflow-hidden">
        {/* Placeholder for the background effect - a simplified version */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative w-full h-full opacity-30">
            {/* Array of placeholder bulb elements to create the visual effect */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-12 h-12 bg-white rounded-full blur-xl animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-center mx-auto max-w-lg">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-indigo-600 font-bold shadow-lg">
            🧠
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">Unlock Your Knowledge</h1>
          <p className="mt-4 text-lg">
            Join QuizMaster and explore a world of customizable quizzes, instant feedback, and fun learning experiences.
          </p>
          
        </div>
      </div>
      
      {/* Right side with the form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;