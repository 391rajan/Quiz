// File: components/CTASection.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/subscriptions/subscribe', {
        email: email.trim(),
        source: 'homepage'
      });

      setMessageType('success');
      setMessage(response.data.message);
      setEmail('');
      
      // Redirect to auth page after successful subscription
      setTimeout(() => {
        navigate('/auth');
      }, 2000);

    } catch (error) {
      setMessageType('error');
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-indigo-600 text-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Learning?</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Join thousands of learners who are mastering their knowledge with personalized quizzes and powerful analytics.
        </p>
        
        {message && (
          <div className={`max-w-md mx-auto mb-6 p-3 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 py-3 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            required
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-gray-100 transition-colors text-indigo-600 py-3 px-6 rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign up for free'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;