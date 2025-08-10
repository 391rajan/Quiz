// File: backend/routes/quizRoutes.js

const express = require('express');
const { generateQuiz, getQuizById, submitQuiz, getAllQuizzes } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAllQuizzes); // Get all quizzes for filtering
router.post('/generate', protect, generateQuiz); 
router.get('/:id', protect, getQuizById); 
router.post('/submit', protect, submitQuiz); 

module.exports = router;
