const express = require('express');
const router = express.Router();
const { subscribe, getAllSubscriptions, unsubscribe, getSubscriptionStats } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/subscribe', subscribe);
router.get('/unsubscribe/:email', unsubscribe);

// Protected routes (admin only)
router.get('/all', protect, getAllSubscriptions);
router.get('/stats', protect, getSubscriptionStats);

module.exports = router;




