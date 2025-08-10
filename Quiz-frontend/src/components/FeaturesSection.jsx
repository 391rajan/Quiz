// File: components/FeaturesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      title: "Customizable Quizzes",
      description: "Generate quizzes on any topic, difficulty, and format. Your learning, your rules.",
      link: "/create-quiz",
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16A8 8 0 0010 2zM5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      title: "Instant Feedback",
      description: "Receive real-time results and explanations to learn from your mistakes immediately.",
      link: "/quizzes",
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 002 0V8a1 1 0 00-.445-.832l-1.5-1A1 1 0 009.555 7.168z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      title: "Diverse Categories",
      description: "Explore a vast library of topics, from history and science to coding and art.",
      link: "/quizzes",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-5-8a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z" />
        </svg>
      ),
    },
    {
      title: "Progress Tracking",
      description: "View detailed analytics on your performance and identify your weak topics automatically.",
      link: "/dashboard",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900">Why Choose QuizMaster?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.link}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;