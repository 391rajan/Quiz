// File: components/FilterPanel.jsx
import React from 'react';

const FilterPanel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-bold mb-4">Filters</h4>
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-2">Category</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              Science & Biology
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              History & Events
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              Technology
            </label>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Difficulty</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              Easy
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              Medium
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded text-indigo-600" />
              Hard
            </label>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Duration</p>
          <div className="space-y-1 text-sm">
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" />
              0-15 min
            </label>
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" />
              15-30 min
            </label>
            <label className="flex items-center">
              <input type="radio" name="duration" className="mr-2 text-indigo-600" />
              30+ min
            </label>
          </div>
        </div>
      </div>
      <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md">
        Apply Filters
      </button>
      <button className="mt-2 w-full text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium">
        Clear All
      </button>
    </div>
  );
};

export default FilterPanel;