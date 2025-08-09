// File: components/FilterPanel.jsx
import React, { useState } from 'react';

const FilterPanel = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    duration: '',
  });

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

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, duration: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  
  const handleClearAll = () => {
    const clearedFilters = { categories: [], difficulties: [], duration: '' };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters); // Also apply the cleared filters
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-bold mb-4">Filters</h4>
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-2">Category</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="Science & Biology" onChange={(e) => handleCheckboxChange(e, 'categories')} checked={filters.categories.includes('Science & Biology')} />
              Science & Biology
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="History & Events" onChange={(e) => handleCheckboxChange(e, 'categories')} checked={filters.categories.includes('History & Events')} />
              History & Events
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" value="Technology" onChange={(e) => handleCheckboxChange(e, 'categories')} checked={filters.categories.includes('Technology')} />
              Technology
            </label>
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
        <div>
          <p className="font-semibold mb-2">Duration</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" value="0-15" onChange={handleRadioChange} checked={filters.duration === '0-15'} />
              0-15 min
            </label>
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" value="15-30" onChange={handleRadioChange} checked={filters.duration === '15-30'} />
              15-30 min
            </label>
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" value="30+" onChange={handleRadioChange} checked={filters.duration === '30+'} />
              30+ min
            </label>
          </div>
        </div>
      </div>
      <button 
        onClick={handleApplyFilters}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md"
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