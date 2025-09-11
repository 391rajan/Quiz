// File: pages/QuizSelectionPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizGridSection from '../components/QuizGridSection';
import FilterPanel from '../components/FilterPanel';
import FeaturedQuizzesSection from '../components/FeaturedQuizzesSection';
import { analyticsAPI, APIError } from '../utils/api';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

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

  const fetchQuizzes = useCallback(async (filterState) => {
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
      if (err instanceof APIError) {
        setError(err.message || 'Failed to load quizzes. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes(filters);
  }, [filters, fetchQuizzes]); 

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ categories: [], difficulties: [] });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonQuizCard key={i} />)}
        </div>
      );
    }

    if (error) {
      return <ErrorState message={error} onRetry={() => fetchQuizzes(filters)} />;
    }

    if (quizzes.length === 0) {
      return <EmptyState message="Try adjusting your filters or check back later for more quizzes." onClearFilters={handleClearFilters} />;
    }

    return <QuizGridSection quizzes={quizzes} />;
  }

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-8 md:pt-32 md:pb-16"> 
        <FeaturedQuizzesSection />
        <hr className="my-12 border-gray-200" />
        <div className="grid lg:grid-cols-4 gap-8">
          <FilterPanel onApplyFilters={handleFilterChange} />
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizSelectionPage;
