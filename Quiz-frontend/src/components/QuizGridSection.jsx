// File: components/QuizGridSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg flex flex-col min-h-[250px]">
      <div className="bg-gray-200 h-24 rounded-lg mb-4"></div>
      <h4 className="text-lg font-semibold mb-2">{quiz.title}</h4>
      <p className="text-sm text-gray-500 flex items-center mb-1">
        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 002 0V8a1 1 0 00-.445-.832l-1.5-1A1 1 0 009.555 7.168z" /></svg>
        {quiz.time}
      </p>
      <p className="text-sm text-gray-500 flex items-center mb-4">
        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11V7a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 01-1-1z" /></svg>
        {quiz.questions} Questions
      </p>
      <Link
        to="#"
        className="mt-auto block text-center bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md"
      >
        Start Quiz
      </Link>
    </div>
  );
};

const QuizGridSection = ({ quizzes }) => {
  return (
    <div className="lg:col-span-3">
      <h3 className="text-xl font-bold mb-4">Explore Quizzes</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizGridSection;