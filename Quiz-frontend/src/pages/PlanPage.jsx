// File: pages/PlanPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentAPI, authAPI } from '../utils/api';

const PlanPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePayment = async (plan, amount) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Show processing message
      setSuccess('Processing payment...');

      const data = await paymentAPI.dummyPayment({ plan, amount });
      
      // Show success message with dummy transaction ID
      setSuccess(`${data.message}\nTransaction ID: ${data.transactionId}`);
      
      // Refresh the user's profile to get updated subscription status
      const profileData = await authAPI.getProfile();
      if (profileData) {
        // Update user context with new subscription info
        user.subscriptionPlan = profileData.subscriptionPlan;
        user.subscriptionStatus = profileData.subscriptionStatus;
      }
    } catch (err) {
      setError(err.message || 'Dummy payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose a Plan</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
          Unlock the full potential of QuizMaster with a plan that fits your learning needs.
        </p>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center mb-4">{success}</div>}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <p className="text-gray-500 mb-4">Perfect for casual learners</p>
            <p className="text-4xl font-extrabold text-indigo-600 mb-6">$0<span className="text-xl font-medium text-gray-400">/mo</span></p>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Limited AI-Generated Quizzes
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Basic Performance Tracking
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> 5 Questions per Quiz
              </li>
              <li className="flex items-center text-gray-400">
                <span className="text-gray-400 mr-2">✗</span> Detailed Weak Topic Analysis
              </li>
              <li className="flex items-center text-gray-400">
                <span className="text-gray-400 mr-2">✗</span> Priority Support
              </li>
            </ul>
            <Link 
              to="/auth"
              className="mt-8 inline-block w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition-colors"
            >
              Start for Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-indigo-600 text-white p-8 rounded-lg shadow-xl border-4 border-indigo-700 relative scale-105">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-indigo-200 mb-4">For dedicated students & educators</p>
            <p className="text-4xl font-extrabold mb-6">$9<span className="text-xl font-medium text-indigo-200">/mo</span></p>
            <ul className="text-left space-y-3">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✔</span> Unlimited AI-Generated Quizzes
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✔</span> Advanced Performance Analytics
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✔</span> Detailed Weak Topic Analysis
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✔</span> Up to 50 Questions per Quiz
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✔</span> Priority Support
              </li>
            </ul>
            <button 
              onClick={() => handlePayment('pro', 9)}
              disabled={loading || !user}
              className="mt-8 inline-block w-full bg-white text-indigo-600 py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
            {!user && <p className="text-white text-xs mt-2">Please log in to purchase a plan.</p>}
          </div>

          {/* Team Plan */}
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">Team Plan</h3>
            <p className="text-gray-500 mb-4">For schools & businesses</p>
            <p className="text-4xl font-extrabold text-indigo-600 mb-6">$29<span className="text-xl font-medium text-gray-400">/mo</span></p>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Everything in Pro
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Collaborative Quiz Creation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Team Analytics Dashboard
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Dedicated Account Manager
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Centralized Billing
              </li>
            </ul>
            <button 
              onClick={() => handlePayment('team', 29)}
              disabled={loading || !user}
              className="mt-8 inline-block w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Contact Sales'}
            </button>
            {!user && <p className="text-gray-500 text-xs mt-2">Please log in to purchase a plan.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlanPage;
