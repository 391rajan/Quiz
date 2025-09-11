// File: pages/ResultsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { analyticsAPI, APIError } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import CircularProgressBar from '../components/CircularProgressBar';
import ErrorState from '../components/ErrorState';

const LoadingSkeleton = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-8 mx-auto"></div>
        <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        </div>
        <div className="mt-12">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    </div>
);

const ResultsPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [results, setResults] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [resultsData, analyticsData] = await Promise.all([
        analyticsAPI.getQuizResults(attemptId),
        analyticsAPI.getUserAnalytics(),
      ]);
      setResults(resultsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Error fetching results:', err);
      if (err instanceof APIError) {
        setError(err.message || 'Failed to load quiz results.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  if (loading) {
    return (
        <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 md:px-8 py-16">
                <LoadingSkeleton />
            </main>
            <Footer />
        </div>
    );
  }

  if (error) {
    return (
        <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 md:px-8 py-16">
                <ErrorState message={error} onRetry={fetchResults} />
            </main>
            <Footer />
        </div>
    );
  }

  if (!results || !analytics) {
    return <div className="text-center p-8">No results found.</div>;
  }

  const scorePercentage = (results.score / results.totalQuestions) * 100;
  const incorrectQuestions = results.questions.filter(q => !q.isCorrect);

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-900">Quiz Results</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            {user ? `Hello, ${user.username}! Here's your performance on "${results.topic}"` : `Summary of your performance on "${results.topic}"`}
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="flex justify-center">
                <CircularProgressBar percentage={scorePercentage} />
            </div>
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-center bg-green-100 p-4 rounded-lg">
                    <span className="text-3xl mr-4">✅</span>
                    <div>
                        <p className="text-3xl font-bold text-green-600">{results.score}</p>
                        <p className="text-md font-semibold text-gray-700">Correct Answers</p>
                    </div>
                </div>
                <div className="flex items-center bg-red-100 p-4 rounded-lg">
                    <span className="text-3xl mr-4">❌</span>
                    <div>
                        <p className="text-3xl font-bold text-red-600">{incorrectQuestions.length}</p>
                        <p className="text-md font-semibold text-gray-700">Incorrect Answers</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions Review</h3>
            {results.questions.map((q, index) => (
              <div key={index} className="p-6 mb-4 rounded-xl border border-gray-200 bg-gray-50">
                <p className="font-bold text-lg mb-4">{`Q${index + 1}: ${q.questionText}`}</p>
                <div className="space-y-2 text-md">
                  {q.options.map((option, optIndex) => {
                      const optionLetter = String.fromCharCode(65 + optIndex);
                      const isCorrect = q.correctAnswer === optionLetter;
                      const isUserChoice = q.userAnswer === optionLetter;
                      return (
                        <div key={optIndex} className={`p-3 rounded-lg flex items-center ${
                          isCorrect ? 'bg-green-100 text-green-800 font-semibold' : 
                          isUserChoice && !isCorrect ? 'bg-red-100 text-red-800 font-semibold' : 'text-gray-700'
                        }`}>
                          <span className="mr-3">{isCorrect ? '✔️' : isUserChoice ? '✖️' : '➖'}</span>
                          {option}
                        </div>
                      );
                  })}
                </div>
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-semibold text-md text-indigo-800">Explanation:</p>
                  <p className="text-md text-gray-700 mt-1">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-12">
            <button onClick={() => navigate('/quizzes')} className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Back to Quizzes
            </button>
            <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
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