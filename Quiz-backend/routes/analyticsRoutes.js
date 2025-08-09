// File: backend/routes/analyticsRoutes.js

const express = require('express');
const { getQuizResults, getUserAnalytics, getAllQuizzes } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// This route is public and does NOT require a login
router.get('/quizzes', getAllQuizzes); 

// These routes remain private as they deal with user-specific data
router.get('/results/:attemptId', protect, getQuizResults);
router.get('/me', protect, getUserAnalytics);

module.exports = router;
