// File: frontend/src/components/ErrorState.jsx

import React from 'react';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-red-700">An Error Occurred</h3>
      <p className="text-red-600 mt-2">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
