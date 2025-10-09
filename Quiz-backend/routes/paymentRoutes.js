const express = require('express');
const router = express.Router();
const { 
  processDummyPayment,
  getSubscriptionStatus
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/dummy-payment').post(protect, processDummyPayment);
router.route('/subscription-status').get(protect, getSubscriptionStatus);

module.exports = router;