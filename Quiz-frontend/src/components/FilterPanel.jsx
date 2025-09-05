// File: components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../utils/api';
import { getAllCategories, getTopicsForCategory } from '../utils/categories';

const CustomCheckbox = ({ label, id, ...props }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
    <input type="checkbox" id={id} className="hidden peer" {...props} />
    <span className="w-5 h-5 border-2 rounded-md border-gray-300 group-hover:border-indigo-400 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-colors">
      <svg className="w-3 h-3 text-white hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
    </span>
    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">{label}</span>
  </label>
);

const FilterPanel = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
  });
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const quizzes = await analyticsAPI.getAllQuizzes();
        const topics = [...new Set(quizzes.map(quiz => quiz.topic))];
        const categories = getAllCategories().filter(category => {
          const categoryTopics = getTopicsForCategory(category);
          return categoryTopics.some(topic => topics.includes(topic));
        });
        setAvailableCategories(categories);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setAvailableCategories(getAllCategories());
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter(item => item !== value),
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  
  const handleClearAll = () => {
    const clearedFilters = { categories: [], difficulties: [] };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-2/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold">Filters</h4>
        <button 
          onClick={handleClearAll}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <p className="font-semibold mb-3 text-gray-800">Category</p>
          <div className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2">
            {availableCategories.map((category) => (
              <CustomCheckbox 
                key={category}
                id={`cat-${category}`}
                label={category}
                value={category}
                onChange={(e) => handleCheckboxChange(e, 'categories')}
                checked={filters.categories.includes(category)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3 text-gray-800">Difficulty</p>
          <div className="space-y-2 text-sm">
            <CustomCheckbox id="diff-easy" label="Easy" value="easy" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('easy')} />
            <CustomCheckbox id="diff-medium" label="Medium" value="medium" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('medium')} />
            <CustomCheckbox id="diff-hard" label="Hard" value="hard" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('hard')} />
          </div>
        </div>
      </div>
      <button 
        onClick={handleApplyFilters}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
