// File: frontend/src/components/EmptyState.jsx

import React from 'react';

const EmptyState = ({ message, onClearFilters }) => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700">No Quizzes Found</h3>
      <p className="text-gray-500 mt-2">{message}</p>
      {onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
