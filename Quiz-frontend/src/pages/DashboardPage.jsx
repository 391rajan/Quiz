// File: frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { analyticsAPI, APIError } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Chart from 'chart.js/auto';
import ErrorState from '../components/ErrorState';

const LoadingSkeleton = () => (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-8 mx-auto"></div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-200 p-6 rounded-lg h-28"></div>
            <div className="bg-gray-200 p-6 rounded-lg h-28"></div>
            <div className="bg-gray-200 p-6 rounded-lg h-28"></div>
        </div>
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
    </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsAPI.getUserAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      if (err instanceof APIError) {
        setError(err.message || 'Failed to load performance data.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    } else {
      setLoading(false);
      setError('Please log in to view your dashboard.');
    }
  }, [user, fetchAnalytics]);

  useEffect(() => {
    if (analytics && analytics.analytics && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const topics = Object.keys(analytics.analytics);
      const averageScores = topics.map(topic => analytics.analytics[topic].averageScore);

      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(79, 70, 229, 0.8)');
      gradient.addColorStop(1, 'rgba(165, 180, 252, 0.8)');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: topics,
          datasets: [{
            label: 'Average Score (%)',
            data: averageScores,
            backgroundColor: gradient,
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: 'rgba(79, 70, 229, 1)',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(200, 200, 200, 0.2)' },
              title: {
                display: true,
                text: 'Average Score (%)',
                font: { size: 14, weight: 'bold' }
              }
            },
            x: {
                grid: { display: false },
                title: {
                    display: true,
                    text: 'Topic',
                    font: { size: 14, weight: 'bold' }
                }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: { size: 16 },
              bodyFont: { size: 14 },
              callbacks: {
                label: (context) => `${context.dataset.label || ''}: ${context.parsed.y.toFixed(1)}%`
              }
            }
          }
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [analytics]);

  const renderContent = () => {
    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={user ? fetchAnalytics : null} />;
    }

    if (!user) {
        return (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Access Denied</h2>
                <p className="text-gray-600">Please log in to view your personalized dashboard.</p>
                <Link to="/auth" className="mt-6 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
                    Go to Login
                </Link>
            </div>
        );
    }

    if (!analytics || analytics.quizHistory.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-lg text-gray-600">You haven't taken any quizzes yet. Start generating quizzes to see your performance here!</p>
                <Link to="/create-quiz" className="mt-6 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
                    Create Your First Quiz
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">
                Welcome to Your Dashboard, {user.username}!
            </h2>
            <p className="text-center text-gray-600 mb-8">
                Track your progress and identify areas for improvement.
            </p>
            <>
              {/* Overall Performance Summary */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center">
                  <p className="text-5xl font-bold text-blue-600">
                    {analytics.overallScore.percentage.toFixed(1)}%
                  </p>
                  <p className="text-md font-semibold text-gray-700 mt-2">Overall Average Score</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                  <p className="text-5xl font-bold text-green-600">
                    {analytics.overallScore.totalScore}
                  </p>
                  <p className="text-md font-semibold text-gray-700 mt-2">Total Correct Answers</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
                  <p className="text-5xl font-bold text-purple-600">
                    {analytics.quizHistory.length}
                  </p>
                  <p className="text-md font-semibold text-gray-700 mt-2">Quizzes Taken</p>
                </div>
              </div>

              {/* Performance by Topic Chart */}
              <div className="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance by Topic</h3>
                <div className="chart-container" style={{ height: '400px' }}>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>

              {/* Weak Topics Identified */}
              {analytics.weakTopics.length > 0 && (
                <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Weak Topics Identified 🚨</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {analytics.weakTopics.map((topic, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-semibold">{topic.topic}:</span> You have an average score of {topic.averageScore}%.
                        {topic.subTopics && topic.subTopics.length > 0 && (
                          <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                            {topic.subTopics.map((sub, subIndex) => (
                              <li key={subIndex} className="text-sm">
                                <span className="font-semibold">{sub.subTopic}:</span> {sub.averageScore}% average score ({sub.correct}/{sub.total} correct).
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    **Suggestion:** Generate more quizzes on these topics to strengthen your knowledge!
                  </p>
                </div>
              )}

              {/* Strong Topics */}
              {analytics.strongTopics.length > 0 && (
                <div className="mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Strong Topics 💪</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analytics.strongTopics.map((topic, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-semibold">{topic.topic}:</span> {topic.message}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    **Keep it up!** Continue practicing to maintain your expertise.
                  </p>
                </div>
              )}

              {/* Recent Quiz History */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Quiz History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                        <th className="py-3 px-4 rounded-tl-lg">Topic</th>
                        <th className="py-3 px-4">Score</th>
                        <th className="py-3 px-4">Date Taken</th>
                        <th className="py-3 px-4 rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.quizHistory.map((attempt) => (
                        <tr key={attempt._id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{attempt.topic}</td>
                          <td className="py-3 px-4 text-sm">{attempt.score}/{attempt.totalQuestions}</td>
                          <td className="py-3 px-4 text-sm">{new Date(attempt.dateTaken).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <Link 
                              to={`/results/${attempt._id}`} 
                              className="text-indigo-600 hover:underline text-sm font-medium"
                            >
                              View Results
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
        </div>
    );
  }

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;