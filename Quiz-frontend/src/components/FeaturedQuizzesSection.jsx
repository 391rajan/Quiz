// File: components/FeaturedQuizzesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedQuizCard = ({ title, description, buttonText }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg flex flex-col justify-end min-h-[250px] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 rounded-lg"></div>
      <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url(https://placehold.co/800x400/94A3B8/FFFFFF?text=Quiz)"}}></div>
      <div className="relative z-10 text-white p-4 rounded-b-lg">
        <h3 className="text-2xl font-bold mb-2 drop-shadow-md">{title}</h3>
        <p className="text-sm mb-4 drop-shadow-md">{description}</p>
        <Link
          to="#"
          className="inline-block bg-white text-indigo-600 py-2 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const FeaturedQuizzesSection = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Featured Quizzes</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <FeaturedQuizCard 
          title="Mastering Machine Learning Basics"
          description="Mastering Machine Learning Basics & Learning from your daily activities"
          buttonText="Start Quiz"
        />
        <FeaturedQuizCard
          title="The Ultimate History Challenge"
          description="Test your knowledge of world history from ancient civilizations to modern events."
          buttonText="Start Quiz"
        />
      </div>
    </section>
  );
};

export default FeaturedQuizzesSection;