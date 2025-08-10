// File: components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../utils/api';
import { getAllCategories, getTopicsForCategory } from '../utils/categories';

const FilterPanel = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    // duration: '', // Removed duration
  });
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const quizzes = await analyticsAPI.getAllQuizzes();
        
        // Get unique topics from the quizzes
        const topics = [...new Set(quizzes.map(quiz => quiz.topic))];
        setAvailableTopics(topics);
        
        // Get categories that have quizzes
        const categories = getAllCategories().filter(category => {
          const categoryTopics = getTopicsForCategory(category);
          return categoryTopics.some(topic => topics.includes(topic));
        });
        setAvailableCategories(categories);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        // Fallback to static categories if API fails
        setAvailableCategories(getAllCategories());
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  
  const handleClearAll = () => {
    const clearedFilters = { categories: [], difficulties: [] }; // Removed duration
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters); // Also apply the cleared filters
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-bold mb-3">Filters</h4>
      <div className="space-y-3">
        <div>
          <p className="font-semibold mb-2">Category</p>
          <div className="space-y-1 text-sm max-h-48 overflow-y-auto">
            {availableCategories.map((category) => (
              <label key={category} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2 rounded text-indigo-600" 
                  value={category} 
                  onChange={(e) => handleCheckboxChange(e, 'categories')} 
                  checked={filters.categories.includes(category)} 
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Difficulty</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="easy" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('easy')} />
              Easy
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="medium" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('medium')} />
              Medium
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="hard" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('hard')} />
              Hard
            </label>
          </div>
        </div>
        {/* Removed duration filter section */}
      </div>
      <button 
        onClick={handleApplyFilters}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md"
      >
        Apply Filters
      </button>
      <button 
        onClick={handleClearAll}
        className="mt-2 w-full text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterPanel;