// File: pages/QuizSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizGridSection from '../components/QuizGridSection';
import FilterPanel from '../components/FilterPanel';
// import CategorySection from '../components/CategorySection'; // Removed
import FeaturedQuizzesSection from '../components/FeaturedQuizzesSection';
import { analyticsAPI } from '../utils/api';

const QuizSelectionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ categories: [], difficulties: [] }); // Removed duration

  const fetchQuizzes = async (filterState) => {
    setLoading(true);
    setError(null);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (filterState.categories && filterState.categories.length > 0) {
        filterState.categories.forEach(cat => queryParams.append('category', cat));
      }
      
      if (filterState.difficulties && filterState.difficulties.length > 0) {
        filterState.difficulties.forEach(diff => queryParams.append('difficulty', diff));
      }
      
      // Removed duration filter handling
      
      // Use our analytics api utility
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
        <div className="text-center p-8">Loading quizzes...</div>
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
        {/* Removed CategorySection and its hr */}
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizSelectionPage;