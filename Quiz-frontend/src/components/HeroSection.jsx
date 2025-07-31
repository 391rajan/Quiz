// File: components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-white pt-24 pb-12 md:pb-24 lg:pt-32 lg:pb-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-12 md:mb-0 max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-gray-900">
              Master Your Knowledge with QuizMaster
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600">
              The AI-powered quiz generator that helps you learn and test your knowledge on any topic, anytime, anywhere.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="#" className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105">
                Create a Quiz
              </Link>
              <Link to="#" className="bg-white border-2 border-gray-300 hover:bg-gray-100 transition-colors text-gray-800 py-3 px-6 rounded-full text-lg font-semibold shadow-md transform hover:scale-105">
                View Our Plan
              </Link>
            </div>
          </div>
          {/* Placeholder for the hero image and floating elements */}
          <div className="relative w-full md:w-1/2 mt-12 md:mt-0 max-w-sm md:max-w-md">
            <div className="relative bg-purple-200 w-full h-72 rounded-3xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl opacity-20"></div>
              {/* This is a visual representation of the landing page's geometric shapes and quiz-related elements */}
              <div className="absolute top-8 left-8 p-4 bg-white rounded-xl shadow-md transform rotate-6">
                <p className="text-sm font-bold text-gray-700">Question 1</p>
                <div className="mt-2 w-32 h-2 bg-gray-200 rounded"></div>
                <div className="mt-1 w-24 h-2 bg-gray-200 rounded"></div>
              </div>
              <div className="absolute bottom-10 right-8 p-3 bg-white rounded-lg shadow-md transform -rotate-3">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-yellow-300 opacity-60 blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
