// File: pages/QuizSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuizGridSection from '../components/QuizGridSection';
import FilterPanel from '../components/FilterPanel';
import CategorySection from '../components/CategorySection';
import FeaturedQuizzesSection from '../components/FeaturedQuizzesSection';


const QuizSelectionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ categories: [], difficulties: [], duration: '' });
  
  const mockCategories = [
    "Science & Biology", "History & Events", "Arts & Literature", "Pop Culture & Trivia",
    "Health & Wellness", "Technology & Gadgets", "Sports & Games", "Music & Cinema",
    "General Knowledge",
  ];


  const fetchQuizzes = async (filterState) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const queryParams = new URLSearchParams();
      // Use the correct syntax to handle multiple values for a single parameter
      filterState.categories.forEach(cat => queryParams.append('category', cat));
      filterState.difficulties.forEach(diff => queryParams.append('difficulty', diff));
      if (filterState.duration) {
        queryParams.append('duration', filterState.duration);
      }

      const { data } = await axios.get(`http://localhost:5000/api/analytics/quizzes?${queryParams.toString()}`, config);
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
    return <div className="text-center p-8">Loading quizzes...</div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }
  

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <FeaturedQuizzesSection quizzes={quizzes} />
        <hr className="my-12 border-gray-200" />
        <div className="grid lg:grid-cols-4 gap-8">
          <FilterPanel onFilterChange={handleFilterChange} />
          <QuizGridSection quizzes={quizzes} />
        </div>
        <hr className="my-12 border-gray-200" />
        <CategorySection categories={mockCategories} />
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizSelectionPage;