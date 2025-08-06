// File: backend/routes/analyticsRoutes.js

const express = require('express');
const { getQuizResults, getUserAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/results/:attemptId', protect, getQuizResults); // For specific quiz results
router.get('/me', protect, getUserAnalytics); // For overall user analytics

module.exports = router;