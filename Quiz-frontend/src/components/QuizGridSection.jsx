// File: components/QuizGridSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuizCard from './QuizCard';

const QuizGridSection = ({ quizzes }) => {
  const [showAll, setShowAll] = useState(false);
  const initialQuizzesToShow = 6; // Show only 6 quizzes initially
  
  const displayedQuizzes = showAll ? quizzes : quizzes.slice(0, initialQuizzesToShow);
  const hasMoreQuizzes = quizzes.length > initialQuizzesToShow;

  return (
    <div className="lg:col-span-3">
      <h3 className="text-xl font-bold mb-4">Explore Quizzes</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
          displayedQuizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))
        ) : (
                    <div className="sm:col-span-2 lg:col-span-3 text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Quizzes Found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
          </div>
        )}
      </div>
      
      {hasMoreQuizzes && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 px-6 rounded-full text-sm font-semibold shadow-md"
          >
            {showAll ? `Show Less (${initialQuizzesToShow})` : `Show More (${quizzes.length - initialQuizzesToShow} more)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGridSection;
