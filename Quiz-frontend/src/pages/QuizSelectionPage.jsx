// File: pages/QuizSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizGridSection from '../components/QuizGridSection';
import FilterPanel from '../components/FilterPanel';
import FeaturedQuizzesSection from '../components/FeaturedQuizzesSection';
import { analyticsAPI } from '../utils/api';

const SkeletonQuizCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-40 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const QuizSelectionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ categories: [], difficulties: [] });

  const fetchQuizzes = async (filterState) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      
      if (filterState.categories && filterState.categories.length > 0) {
        filterState.categories.forEach(cat => queryParams.append('category', cat));
      }
      
      if (filterState.difficulties && filterState.difficulties.length > 0) {
        filterState.difficulties.forEach(diff => queryParams.append('difficulty', diff));
      }
      
      const data = await analyticsAPI.getAllQuizzes(queryParams.toString());
      setQuizzes(data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
      setError('Failed to load quizzes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(filters);
  }, [filters]); 

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 md:px-8 pt-24 pb-8 md:pt-32 md:pb-16">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <hr className="my-8 border-gray-200" />
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
                <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-6 mt-8"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonQuizCard key={i} />)}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
        <Header />
        <div className="text-center p-8 text-red-500">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-8 md:pt-32 md:pb-16"> {/* Added pt-24/pt-32 for header spacing */}
        <FeaturedQuizzesSection />
        <hr className="my-8 border-gray-200" />
        <div className="grid lg:grid-cols-4 gap-6">
          <FilterPanel onApplyFilters={handleFilterChange} />
          <div className="lg:col-span-3">
            <QuizGridSection quizzes={quizzes} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizSelectionPage;