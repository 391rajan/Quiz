// File: components/QuizCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getQuizImage, getQuizDuration } from '../utils/quizImages';

const QuizCard = ({ quiz }) => {
  const quizImage = getQuizImage(quiz.topic);
  const duration = getQuizDuration(quiz.difficulty, quiz.questions.length);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg flex flex-col min-h-[280px] group">
      <div className="relative overflow-hidden rounded-lg mb-4 h-32">
        <img 
          src={quizImage} 
          alt={quiz.topic}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <h4 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">{quiz.topic}</h4>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 002 0V8a1 1 0 00-.445-.832l-1.5-1A1 1 0 009.555 7.168z" />
          </svg>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11V7a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 01-1-1z" />
          </svg>
          {quiz.questions.length} Questions
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 002 0V8a1 1 0 00-.445-.832l-1.5-1A1 1 0 009.555 7.168z" />
          </svg>
          {duration}
        </p>
      </div>
      
      <Link
        to={`/quiz/${quiz._id}`}
        className="mt-auto block text-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;