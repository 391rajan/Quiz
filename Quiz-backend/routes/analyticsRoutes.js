// File: backend/routes/analyticsRoutes.js

const express = require('express');
const {
  getQuizResults,
  getUserAnalytics,
  getAllQuizzes,
  getUserActivity,
  getQuizProgress,
  saveQuizProgress,
  getDashboardStats
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// This route is public and does NOT require a login
router.get('/quizzes', getAllQuizzes); 

// These routes remain private as they deal with user-specific data
router.get('/quiz-results', protect, getQuizResults);
router.get('/user-analytics', protect, getUserAnalytics);
router.get('/all-quizzes', protect, getAllQuizzes);
router.get('/activity', protect, getUserActivity);
router.get('/progress/:quizId', protect, getQuizProgress);
router.post('/progress/:quizId', protect, saveQuizProgress);
router.get('/dashboard', protect, getDashboardStats);

module.exports = router;
