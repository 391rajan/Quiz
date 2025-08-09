// File: components/QuizGridSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import QuizCard from './QuizCard';

const QuizGridSection = ({ quizzes }) => {
  return (
    <div className="lg:col-span-3">
      <h3 className="text-xl font-bold mb-4">Explore Quizzes</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))
        ) : (
          <p className="text-gray-500">No quizzes available. Go to the Create page to generate a new quiz!</p>
        )}
      </div>
    </div>
  );
};

export default QuizGridSection;
