// File: backend/controllers/quizController.js
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const { generateQuizQuestions, AIError } = require('../utils/aiService');
const asyncHandler = require('express-async-handler');

// @desc    Generate a new quiz using AI
// @route   POST /api/quizzes/generate
// @access  Private
const generateQuiz = asyncHandler(async (req, res) => {
  console.log('--- generateQuiz function called ---');
  console.log('Request Body:', req.body);
  const { topic, difficulty, numQuestions } = req.body;
  const userId = req.user._id;

  if (!topic || !difficulty || !numQuestions) {
    res.status(400);
    throw new Error('Please provide topic, difficulty, and number of questions');
  }

  const questionCount = parseInt(numQuestions, 10);
  if (isNaN(questionCount) || questionCount <= 0) {
    res.status(400);
    throw new Error('Number of questions must be a positive integer.');
  }

  try {
    const questions = await generateQuizQuestions(topic, difficulty, questionCount);

    if (!questions || questions.length === 0) {
      // This case might be redundant if generateQuizQuestions always throws an error on failure,
      // but it's good practice to keep it as a fallback.
      res.status(500);
      throw new Error('Failed to generate questions: AI returned no questions.');
    }

    const newQuiz = await Quiz.create({
      topic,
      difficulty,
      questions,
      createdBy: userId,
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    if (error instanceof AIError) {
      // If it's a specific AI-related error, send a detailed response
      res.status(error.statusCode || 500).json({
        message: error.message,
        details: error.details,
      });
    } else {
      // For any other errors, let the generic asyncHandler and error handler middleware deal with it
      throw error;
    }
  }
});

// @desc    Get a quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    // Exclude correct answers and explanations from the quiz sent to the client
    const quizForStudent = { ...quiz.toObject() };
    quizForStudent.questions = quizForStudent.questions.map(q => {
      const { correctAnswer, explanation, ...question } = q;
      return question;
    });
    res.json(quizForStudent);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});

// @desc    Submit a completed quiz
// @route   POST /api/quizzes/submit
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, userAnswers } = req.body;
  const userId = req.user._id;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  let score = 0;
  const processedAnswers = [];

  userAnswers.forEach(userAnswer => {
    const question = quiz.questions.id(userAnswer.questionId);
    if (question) {
      const isCorrect = question.correctAnswer.trim() === userAnswer.userAnswer.trim();
      if (isCorrect) {
        score++;
      }
      processedAnswers.push({
        questionId: question._id,
        userAnswer: userAnswer.userAnswer,
        isCorrect: isCorrect,
        subTopic: question.subTopic,
      });
    }
  });

  const newAttempt = await QuizAttempt.create({
    userId,
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    answers: processedAnswers,
  });
  
  await User.findByIdAndUpdate(
    userId,
    { $push: { quizHistory: newAttempt._id } },
    { new: true, useFindAndModify: false }
  );

  res.status(201).json(newAttempt);
});

// @desc    Get all quizzes for filtering
// @route   GET /api/quizzes
// @access  Private
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({}).select('topic difficulty');
  res.json(quizzes);
});

// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
  const { topic, difficulty, questions } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  quiz.topic = topic || quiz.topic;
  quiz.difficulty = difficulty || quiz.difficulty;
  if (questions && questions.length > 0) {
    quiz.questions = questions;
  }

  const updatedQuiz = await quiz.save();
  res.json(updatedQuiz);
});

module.exports = { generateQuiz, getQuizById, submitQuiz, getAllQuizzes, updateQuiz };