// File: frontend/src/pages/QuizPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Placeholder for a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
  </div>
);

const QuizPage = () => {
  const { id } = useParams(); // Get quiz ID from URL
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`, config);
        setQuiz(data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleNextQuestion = () => {
    // Save the user's answer
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion._id,
      userAnswer: selectedAnswer,
    };
    setUserAnswers([...userAnswers, newAnswer]);

    // Move to the next question or submit the quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      // End of quiz, submit answers
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/api/quizzes/submit`, {
        quizId: id,
        userAnswers,
      }, config);
      console.log('Quiz submitted successfully:', data);
      
      // Navigate to the results page, passing the newly created attempt ID
      navigate(`/results/${data._id}`);
      
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (!quiz) {
    return <div className="text-center p-8 text-gray-500">Quiz not found.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen p-8">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Question Counter & Score */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-gray-500">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</span>
          <span className="text-sm font-semibold text-gray-600">+5</span>
        </div>

        {/* Question Card */}
        <div className="text-center p-8 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-8">
            {currentQuestion.questionText}
          </h3>
          <div className="max-w-md mx-auto">
            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(String.fromCharCode(65 + index))}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswer === String.fromCharCode(65 + index)
                      ? 'bg-indigo-100 border-indigo-600 text-indigo-800 font-semibold'
                      : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Report
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors"
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;