const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Process a dummy payment
// @route   POST /api/payments/dummy-payment
// @access  Private
const processDummyPayment = asyncHandler(async (req, res) => {
  const { plan, amount } = req.body;
  const userId = req.user._id;

  console.log(`Processing dummy payment for plan: ${plan}, amount: $${amount}`);

  // Simulate payment processing with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Simulate a success rate of 90%
    const isSuccess = Math.random() < 0.9;

    if (!isSuccess) {
      throw new Error('Payment simulation failed');
    }

    // Update user's subscription
    await User.findByIdAndUpdate(userId, {
      subscriptionPlan: plan,
      subscriptionDate: new Date(),
      subscriptionStatus: 'active'
    });

    console.log(`Dummy payment succeeded for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: `Successfully subscribed to ${plan} plan! (Dummy Payment)`,
      transactionId: `dummy_${Date.now()}`,
      amount,
      plan
    });
  } catch (err) {
    console.error(`Dummy payment failed: ${err.message}`);
    res.status(400);
    throw new Error('Dummy payment failed. Please try again.');
  }
});

// @desc    Get subscription status
// @route   GET /api/payments/subscription-status
// @access  Private
const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    plan: user.subscriptionPlan || 'free',
    status: user.subscriptionStatus || 'inactive',
    date: user.subscriptionDate
  });
});

module.exports = { 
  processDummyPayment,
  getSubscriptionStatus
};