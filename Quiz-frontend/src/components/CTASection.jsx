// File: components/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-indigo-600 text-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Learning?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Join thousands of learners who are mastering their knowledge with personalized quizzes and powerful analytics.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-64 py-3 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Link to="#" className="bg-white hover:bg-gray-100 transition-colors text-indigo-600 py-3 px-6 rounded-full font-semibold shadow-lg">
            Sign up for free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;