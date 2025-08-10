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
          <p className="text-gray-500">No quizzes available. Go to the Create page to generate a new quiz!</p>
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
