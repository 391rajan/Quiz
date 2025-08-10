// File: components/FeaturedQuizzesSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../utils/api';
import { getCategoryForTopic } from '../utils/categories';
import { getQuizImage, getQuizDuration } from '../utils/quizImages';

const FeaturedQuizCard = ({ quiz, buttonText, isActive }) => {
  const category = getCategoryForTopic(quiz.topic);
  const quizImage = getQuizImage(quiz.topic);
  const duration = getQuizDuration(quiz.difficulty, quiz.questions.length);
  
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md transition-all duration-700 ease-in-out ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
    }`}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={quizImage} 
          alt={quiz.topic}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {category}
            </span>
            <span className={`inline-block text-xs px-2 py-1 rounded-full ${
              quiz.difficulty === 'easy' ? 'bg-green-500' :
              quiz.difficulty === 'medium' ? 'bg-yellow-500' :
              'bg-red-500'
            } text-white`}>
              {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            </span>
            <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {duration}
            </span>
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{quiz.topic}</h3>
      <p className="text-gray-600 mb-4">
        {quiz.questions.length} questions • {duration} • Test your knowledge in {category.toLowerCase()}
      </p>
      
      <Link
        to={`/quiz/${quiz._id}`}
        className="inline-block bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 px-6 rounded-full text-sm font-semibold shadow-md hover:shadow-lg"
      >
        {buttonText}
      </Link>
    </div>
  );
};

const FeaturedQuizzesSection = () => {
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedQuizzes = async () => {
      try {
        setLoading(true);
        const quizzes = await analyticsAPI.getAllQuizzes();
        
        // Select featured quizzes (you can customize this logic)
        // For now, let's pick quizzes from different categories and difficulties
        const featured = quizzes
          .sort((a, b) => {
            // Prioritize medium difficulty quizzes
            if (a.difficulty === 'medium' && b.difficulty !== 'medium') return -1;
            if (b.difficulty === 'medium' && a.difficulty !== 'medium') return 1;
            return 0;
          })
          .slice(0, 6); // Get up to 6 quizzes for rotation
        
        setFeaturedQuizzes(featured);
      } catch (error) {
        console.error('Error fetching featured quizzes:', error);
        // Fallback to empty array
        setFeaturedQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedQuizzes();
  }, []);

  // Auto-rotate featured quizzes every 2.5 seconds
  useEffect(() => {
    if (featuredQuizzes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentQuizIndex((prevIndex) => 
        (prevIndex + 1) % featuredQuizzes.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [featuredQuizzes.length]);

  if (loading) {
    return (
      <section className="mt-2 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Quizzes</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredQuizzes.length === 0) {
    return (
      <section className="mt-2 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Quizzes</h2>
        <div className="text-center text-gray-500 py-6">
          No quizzes available at the moment.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-2 mb-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Quizzes</h2>
      
      {/* Single featured quiz with rotation */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {featuredQuizzes.map((quiz, index) => (
            <FeaturedQuizCard 
              key={quiz._id}
              quiz={quiz}
              buttonText="Start Quiz"
              isActive={index === currentQuizIndex}
            />
          ))}
          
          {/* Quiz navigation dots */}
          {featuredQuizzes.length > 1 && (
            <div className="flex justify-center mt-4 space-x-3">
              {featuredQuizzes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuizIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentQuizIndex 
                      ? 'bg-indigo-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to quiz ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedQuizzesSection;