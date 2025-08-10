import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [showFAB, setShowFAB] = useState(false);

  // Show FAB after scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <PartnersSection />
      </main>
      <Footer />

      {/* Floating Action Button */}
      {showFAB && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
            <div className="relative group">
              <button className="w-12 h-12 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              
              {/* Quick Actions Menu */}
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white rounded-lg shadow-lg p-2 space-y-2 min-w-[160px]">
                  <Link 
                    to="/quizzes"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-medium">Take Quiz</span>
                  </Link>
                  
                  <Link 
                    to="/create-quiz"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm font-medium">Create Quiz</span>
                  </Link>
                  
                  <Link 
                    to="/plans"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">View Plans</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;