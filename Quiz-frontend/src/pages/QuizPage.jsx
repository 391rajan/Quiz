// File: frontend/src/pages/QuizPage.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getQuestionTimeLimit, formatTimeRemaining } from '../utils/quizImages';

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
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Function to play warning sound
  const playWarningSound = () => {
    try {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (err) {
      console.error('Audio playback failed:', err);
    }
  };

  // Function to play time up sound
  const playTimeUpSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (err) {
      console.error('Audio playback failed:', err);
    }
  };

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

  const submitQuiz = useCallback(async () => {
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
      
      navigate(`/results/${data._id}`);
      
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
    }
  }, [id, userAnswers, navigate]);

  const handleTimeUp = useCallback(() => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion._id,
      userAnswer: selectedAnswer || null,
    };
    setUserAnswers(prevAnswers => [...prevAnswers, newAnswer]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz();
    }
  }, [quiz, currentQuestionIndex, selectedAnswer, submitQuiz]);

  // Start timer for current question
  useEffect(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      const questionTimeLimit = getQuestionTimeLimit(quiz.difficulty);
      setTimeRemaining(questionTimeLimit);
      setIsTimerRunning(true);
    }
  }, [quiz, currentQuestionIndex]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === 10) {
          playWarningSound();
        }
        
        if (prev <= 1) {
          playTimeUpSound();
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining, handleTimeUp]);

  const handleNextQuestion = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerRunning(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion._id,
      userAnswer: selectedAnswer,
    };
    setUserAnswers([...userAnswers, newAnswer]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      submitQuiz();
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
  const questionTimeLimit = getQuestionTimeLimit(quiz.difficulty);

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
        
        {/* Question Counter, Timer & Score */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-gray-500">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</span>
          
          {/* Timer Display */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className={`text-lg font-mono font-bold ${
              timeRemaining <= 10 ? 'text-red-600' : 
              timeRemaining <= 20 ? 'text-yellow-600' : 'text-gray-700'
            }`}>
              {formatTimeRemaining(timeRemaining)}
            </span>
            <span className="text-sm text-gray-500">/ {formatTimeRemaining(questionTimeLimit)}</span>
          </div>
          
        </div>

        {/* Question Card */}
        <div className="text-center p-8 border border-gray-200 rounded-lg shadow-sm">
          {/* Time Warning Notification */}
          {timeRemaining <= 10 && timeRemaining > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">
                  Time is running out! Please answer quickly.
                </span>
              </div>
            </div>
          )}
          
          <h3 className="text-2xl font-bold mb-8">
            {currentQuestion.questionText}
          </h3>
          
          {/* Timer Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Time Remaining
              </span>
              <span className={`text-sm font-medium ${
                timeRemaining <= 10 ? 'text-red-600' : 
                timeRemaining <= 20 ? 'text-yellow-600' : 'text-gray-600'
              }`}>
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  timeRemaining <= 10 ? 'bg-red-500' : 
                  timeRemaining <= 20 ? 'bg-yellow-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${(timeRemaining / questionTimeLimit) * 100}%` }}
              ></div>
            </div>
          </div>
          
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