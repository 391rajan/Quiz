// File: frontend/src/pages/QuizPage.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI, APIError } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getQuestionTimeLimit, formatTimeRemaining } from '../utils/quizImages';
import ErrorState from '../components/ErrorState';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600"></div>
    </div>
);

const QuizPage = () => {
  const { id } = useParams();
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
  const questionContainerRef = useRef(null);

  const fetchQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await quizAPI.getQuizById(id);
      setQuiz(data);
    } catch (err) {
      console.error('Error fetching quiz:', err);
      if (err instanceof APIError) {
        setError(err.message || 'Failed to load quiz. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const submitQuiz = useCallback(async (finalAnswers) => {
    try {
      const data = await quizAPI.submitQuiz({ quizId: id, userAnswers: finalAnswers });
      navigate(`/results/${data._id}`);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError(err.message || 'Failed to submit quiz. Please try again.');
    }
  }, [id, navigate]);

  const handleNextQuestion = useCallback(() => {
    if (questionContainerRef.current) {
        questionContainerRef.current.classList.add('animate-fade-out');
    }

    setTimeout(() => {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const newAnswer = {
            questionId: currentQuestion._id,
            userAnswer: selectedAnswer,
        };
        const updatedAnswers = [...userAnswers, newAnswer];
        setUserAnswers(updatedAnswers);

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            if (questionContainerRef.current) {
                questionContainerRef.current.classList.remove('animate-fade-out');
                questionContainerRef.current.classList.add('animate-fade-in');
            }
        } else {
            submitQuiz(updatedAnswers);
        }
    }, 500); // Match animation duration
}, [quiz, currentQuestionIndex, selectedAnswer, userAnswers, submitQuiz]);


  useEffect(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      const questionTimeLimit = getQuestionTimeLimit(quiz.difficulty);
      setTimeRemaining(questionTimeLimit);
      setIsTimerRunning(true);
    }
  }, [quiz, currentQuestionIndex]);

  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNextQuestion(); // Automatically move to next question
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeRemaining, handleNextQuestion]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
        <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 md:px-8 py-16">
                <ErrorState message={error} onRetry={fetchQuiz} />
            </main>
            <Footer />
        </div>
    );
  }

  if (!quiz) {
    return <div className="text-center p-8 text-gray-500">Quiz not found.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 flex items-center">
        <div ref={questionContainerRef} className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</span>
                        <span className="text-sm font-semibold text-gray-600">{quiz.topic}</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
                
                {/* Question and Timer */}
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">{currentQuestion.questionText}</h3>
                    <div className="flex items-center justify-center space-x-2 text-2xl font-bold font-mono"
                        role="timer" aria-live="assertive">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span className={timeRemaining <= 10 ? 'text-red-500' : 'text-gray-800'}>
                            {formatTimeRemaining(timeRemaining)}
                        </span>
                    </div>
                </div>
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        const optionLetter = String.fromCharCode(65 + index);
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedAnswer(optionLetter)}
                                className={`w-full text-left p-5 rounded-lg border-2 text-lg transition-all duration-200 transform hover:scale-105 ${
                                    selectedAnswer === optionLetter
                                    ? 'bg-purple-600 border-purple-700 text-white font-bold shadow-lg'
                                    : 'bg-white border-gray-300 hover:bg-purple-50 hover:border-purple-500'
                                }`}
                            >
                                <span className="font-bold mr-3">{optionLetter}.</span>{option}
                            </button>
                        );
                    })}
                </div>

                {/* Navigation Button */}
                <div className="flex justify-end mt-10">
                    <button
                        onClick={handleNextQuestion}
                        className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={!selectedAnswer}
                    >
                        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;