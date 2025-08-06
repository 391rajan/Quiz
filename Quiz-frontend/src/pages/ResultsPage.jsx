// File: pages/ResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ResultsPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [results, setResults] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        // Fetch specific quiz results
        const { data: resultsData } = await axios.get(`http://localhost:5000/api/analytics/results/${attemptId}`, config);
        setResults(resultsData);

        // Fetch overall user analytics
        const { data: analyticsData } = await axios.get(`http://localhost:5000/api/analytics/me`, config);
        setAnalytics(analyticsData);

      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load quiz results.');
      } finally {
        setLoading(false);
      }
    };
    if (attemptId) {
      fetchResults();
    }
  }, [attemptId]);

  if (loading) {
    return <div className="text-center p-8">Loading results...</div>;
  }
  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }
  if (!results || !analytics) {
    return <div className="text-center p-8">No results found.</div>;
  }

  const scorePercentage = (results.score / results.totalQuestions) * 100;
  const incorrectQuestions = results.questions.filter(q => !q.isCorrect);
  const weakTopics = analytics.weakTopics;

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Quiz Results</h2>
          <p className="text-center text-gray-600 mb-8">
            {user ? `Hello, ${user.username}! Here is the summary of your performance on "${results.topic}"` : `Summary of your performance on "${results.topic}"`}
          </p>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <p className="text-6xl font-bold text-indigo-600">{scorePercentage.toFixed(0)}%</p>
              <p className="text-sm font-semibold text-gray-600">Your Score</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold text-green-500">{results.score}</p>
              <p className="text-sm font-semibold text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold text-red-500">{incorrectQuestions.length}</p>
              <p className="text-sm font-semibold text-gray-600">Incorrect</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions Review</h3>
            {results.questions.map((q, index) => (
              <div key={index} className="p-4 mb-4 rounded-lg border border-gray-200">
                <p className="font-semibold">{`Q${index + 1}: ${q.questionText}`}</p>
                <div className="mt-2 text-sm">
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className={`p-2 rounded-lg my-1 ${
                      q.correctAnswer === String.fromCharCode(65 + optIndex)
                        ? 'bg-green-100 text-green-800'
                        : q.userAnswer === String.fromCharCode(65 + optIndex) ? 'bg-red-100 text-red-800' : 'text-gray-700'
                    }`}>
                      {option}
                      {q.correctAnswer === String.fromCharCode(65 + optIndex) && <span className="ml-2 font-bold">(Correct)</span>}
                      {q.userAnswer === String.fromCharCode(65 + optIndex) && <span className="ml-2 font-bold">(Your Answer)</span>}
                    </div>
                  ))}
                </div>
                {/* The new explanation section */}
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="font-semibold text-sm text-gray-800">Explanation:</p>
                  <p className="text-sm text-gray-700 mt-2">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {weakTopics.length > 0 && (
            <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Weak Topics Identified</h3>
              <ul className="list-disc list-inside space-y-1">
                {weakTopics.map((topic, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-semibold">{topic.topic}:</span> {topic.reason}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                **Suggestion:** Generate more quizzes on these topics to improve your skills!
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button onClick={() => navigate('/quizzes')} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Back to Quizzes
            </button>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors">
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;