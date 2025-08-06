// File: backend/routes/quizRoutes.js

const express = require('express');
const { generateQuiz, getQuizById, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/generate', protect, generateQuiz);
router.get('/:id', protect, getQuizById); // New route to get a single quiz
router.post('/submit', protect, submitQuiz); // New route to submit answers

module.exports = router;