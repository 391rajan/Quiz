// File: backend/routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile); // New protected route

module.exports = router;