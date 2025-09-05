// File: components/QuizCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getQuizImage, getQuizDuration } from '../utils/quizImages';

const QuizCard = ({ quiz }) => {
  const quizImage = getQuizImage(quiz.topic);
  const duration = getQuizDuration(quiz.difficulty, quiz.questions.length);

  const difficultyStyles = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative">
        <Link to={`/quiz/${quiz._id}`} className="block">
          <img src={quizImage} alt={quiz.topic} className="w-full h-40 object-cover" />
        </Link>
        <div className={`absolute top-0 right-0 mt-2 mr-2 text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[quiz.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
          {quiz.difficulty}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-grow flex flex-col">
        <h4 className="text-lg font-bold text-gray-800 mb-2 flex-grow">{quiz.topic}</h4>
        <p className="text-sm text-gray-600 mb-4">
          Test your knowledge on {quiz.topic}. A great way to challenge yourself and learn something new!
        </p>
        
        {/* Info Bar */}
        <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-100 pt-3">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {quiz.questions.length} Questions
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {duration}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <Link to={`/quiz/${quiz._id}`} className="block bg-gray-50 hover:bg-indigo-50 p-4 text-center font-bold text-indigo-600 transition-colors duration-300">
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
