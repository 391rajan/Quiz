// File: frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect, useRef } from 'react';
// Removed useParams and useNavigate as they are not used in this component.
import { Link } from 'react-router-dom'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Chart from 'chart.js/auto'; // Import Chart.js

const DashboardPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To store the Chart.js instance

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/analytics/me', config);
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load performance data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Fetch analytics only if user is logged in
      fetchAnalytics();
    } else {
      setLoading(false); // If no user, stop loading and show message
      setError('Please log in to view your dashboard.');
    }
  }, [user]);

  // Effect for Chart.js
  useEffect(() => {
    if (analytics && analytics.analytics && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy old chart instance
      }

      const ctx = chartRef.current.getContext('2d');
      const topics = Object.keys(analytics.analytics);
      const averageScores = topics.map(topic => analytics.analytics[topic].averageScore);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: topics,
          datasets: [{
            label: 'Average Score (%)',
            data: averageScores,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 5,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allow chart to fill container
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Average Score (%)'
              }
            },
            x: {
                title: {
                    display: true,
                    text: 'Topic'
                }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y + '%';
                  }
                  return label;
                }
              }
            }
          }
        },
      });
    }
    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [analytics]); // Re-run when analytics data changes

  if (loading) {
    return <div className="text-center p-8">Loading your dashboard...</div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }
  if (!user) {
    return (
      <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 md:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your personalized dashboard.</p>
          <Link to="/auth" className="mt-6 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
            Go to Login
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">
            Welcome to Your Dashboard, {user.username}!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Track your progress and identify areas for improvement.
          </p>

          {analytics.quizHistory.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg text-gray-600">You haven't taken any quizzes yet. Start generating quizzes to see your performance here!</p>
              <Link to="/create-quiz" className="mt-6 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
                Create Your First Quiz
              </Link>
            </div>
          ) : (
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
                <div className="chart-container" style={{ height: '400px' }}> {/* Fixed height for chart */}
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>

              {/* Weak Topics Identified */}
              {analytics.weakTopics.length > 0 && (
                <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Weak Topics Identified 🚨</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {analytics.weakTopics.map((topic, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-semibold">{topic.topic}:</span> {topic.reason}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;