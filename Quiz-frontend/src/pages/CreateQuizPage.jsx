// File: pages/CreateQuizPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { quizAPI, APIError } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ErrorState from '../components/ErrorState';

const GeneratingQuizOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <h2 className="text-white text-2xl font-bold mb-2">Generating Your Quiz...</h2>
        <p className="text-white text-lg">Our AI is crafting the perfect questions for you. Please wait a moment.</p>
    </div>
);

const CreateQuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quizDetails, setQuizDetails] = useState({
    title: '',
    difficulty: 'medium',
    numQuestions: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
        setError("You must be logged in to create a quiz.");
        setLoading(false);
        return;
    }
    
    try {
      const data = await quizAPI.generateQuiz({
        topic: quizDetails.title,
        difficulty: quizDetails.difficulty,
        numQuestions: quizDetails.numQuestions,
      });

      console.log('Quiz generated successfully:', data);
      navigate(`/quiz/${data._id}`);
    } catch (err) {
      console.error('Quiz generation failed:', err);
      if (err instanceof APIError) {
        setError(err.message || 'Failed to generate quiz.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen">
      {loading && <GeneratingQuizOverlay />}
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-center text-gray-900">Create Your Own Quiz</h2>
            <p className="text-lg text-gray-600 text-center mb-10">
              Tell our AI what you want to learn, and we'll generate a custom quiz for you.
            </p>

            {error && (
                <div className="mb-8">
                    <ErrorState message={error} onRetry={handleGenerateQuiz} />
                </div>
            )}

            <form className="space-y-8" onSubmit={handleGenerateQuiz}>
              <section className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Quiz Details</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="quizTitle" className="block text-lg font-medium text-gray-700 mb-2">Quiz Topic</label>
                    <input
                      type="text"
                      id="quizTitle"
                      name="title"
                      value={quizDetails.title}
                      onChange={handleInputChange}
                      placeholder="e.g., 'React Hooks'"
                      className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="difficulty" className="block text-lg font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={quizDetails.difficulty}
                      onChange={handleInputChange}
                      className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="numQuestions" className="block text-lg font-medium text-gray-700 mb-2">Number of Questions</label>
                    <input
                      type="number"
                      id="numQuestions"
                      name="numQuestions"
                      value={quizDetails.numQuestions}
                      onChange={handleInputChange}
                      placeholder="e.g., 10"
                      min="1"
                      max="20"
                      className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                      required
                    />
                  </div>
                </div>
              </section>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="w-full max-w-xs px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Quiz'}
                </button>
              </div>
            </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateQuizPage;