// File: backend/controllers/quizController.js
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const User = require('../models/User');
const { generateQuizQuestions } = require('../utils/aiService');

// @desc    Generate a new quiz using AI
// @route   POST /api/quizzes/generate
// @access  Private
const generateQuiz = async (req, res) => {
  const { topic, difficulty, numQuestions } = req.body;
  const userId = req.user._id;

  if (!topic || !difficulty || !numQuestions) {
    return res.status(400).json({ message: 'Please provide topic, difficulty, and number of questions' });
  }

  const questionCount = parseInt(numQuestions, 10);
  if (isNaN(questionCount) || questionCount <= 0) {
    return res.status(400).json({ message: 'Number of questions must be a positive integer.' });
  }

  try {
    const questions = await generateQuizQuestions(topic, difficulty, questionCount);

    if (!questions || questions.length === 0) {
      return res.status(500).json({ message: 'Failed to generate questions from AI.' });
    }

    const newQuiz = await Quiz.create({
      topic,
      difficulty,
      questions,
      createdBy: userId,
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ message: 'Server error during quiz generation' });
  }
};

// @desc    Get a quiz by ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Submit a completed quiz
// @route   POST /api/quizzes/submit
// @access  Private
const submitQuiz = async (req, res) => {
  const { quizId, userAnswers } = req.body;
  const userId = req.user._id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const processedAnswers = [];

    userAnswers.forEach(userAnswer => {
      const question = quiz.questions.id(userAnswer.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === userAnswer.userAnswer;
        if (isCorrect) {
          score++;
        }
        processedAnswers.push({
          questionId: question._id,
          userAnswer: userAnswer.userAnswer,
          isCorrect: isCorrect,
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
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error during quiz submission' });
  }
};

// @desc    Get all quizzes for filtering
// @route   GET /api/quizzes
// @access  Private
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).select('topic difficulty');
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateQuiz, getQuizById, submitQuiz, getAllQuizzes };