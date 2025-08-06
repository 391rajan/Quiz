// File: pages/CreateQuizPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// A placeholder component for a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

// Component for a single Multiple Choice Question form
const MultipleChoiceQuestionForm = ({ question, index, onQuestionChange }) => {
  const handleTextChange = (e) => {
    onQuestionChange(index, { ...question, text: e.target.value });
  };

  const handleOptionChange = (e, optionIndex) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = e.target.value;
    onQuestionChange(index, { ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    onQuestionChange(index, { ...question, correctAnswer: e.target.value });
  };

  return (
    <div className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
      <h4 className="font-semibold text-lg mb-2">{`Question ${index + 1}`}</h4>
      <input
        type="text"
        placeholder="Enter your question text"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        value={question.text}
        onChange={handleTextChange}
        required
      />
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-gray-700">Options:</p>
        {[...Array(4)].map((_, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={question.options[optionIndex] || ''}
              onChange={(e) => handleOptionChange(e, optionIndex)}
              required
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
        <select
          value={question.correctAnswer || ''}
          onChange={handleCorrectAnswerChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select Correct Option</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
  );
};


const CreateQuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quizDetails, setQuizDetails] = useState({
    title: '',
    category: '',
    description: '',
    difficulty: 'medium',
    numQuestions: 5, // New state for number of questions
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
    const token = localStorage.getItem('token');

    if (!user || !token) {
        setError("You must be logged in to create a quiz.");
        setLoading(false);
        return;
    }
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/quizzes/generate', {
        topic: quizDetails.title,
        difficulty: quizDetails.difficulty,
        numQuestions: quizDetails.numQuestions, // Send numQuestions to backend
      }, config);

      console.log('Quiz generated successfully:', data);
      navigate(`/quiz/${data._id}`); // Navigate to the new quiz page
    } catch (err) {
      console.error('Quiz generation failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to generate quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Create Your Own Quiz</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-center">
          Tell our AI what you want to learn, and we'll generate a custom quiz for you.
        </p>

        {loading && <LoadingSpinner />}
        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4 text-sm text-center max-w-xl mx-auto">
                {error}
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleGenerateQuiz}>
          {/* Quiz Details Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Quiz Details</h3>
            <p className="text-sm text-gray-500 mb-6">Define the core information and settings for your quiz.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quiz Title */}
              <div>
                <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700">Quiz Topic</label>
                <input
                  type="text"
                  id="quizTitle"
                  name="title"
                  value={quizDetails.title}
                  onChange={handleInputChange}
                  placeholder="e.g., 'React Hooks'"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={quizDetails.difficulty}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {/* Number of Questions */}
              <div>
                <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">Number of Questions</label>
                <input
                  type="number"
                  id="numQuestions"
                  name="numQuestions"
                  value={quizDetails.numQuestions}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="1"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateQuizPage;