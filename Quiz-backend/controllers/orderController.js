const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Plan = require('../models/Plan');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { planId } = req.body;

  const plan = await Plan.findById(planId);

  if (!plan) {
    res.status(404);
    throw new Error('Plan not found');
  }

  const order = new Order({
    user: req.user._id,
    plan: plan._id,
    totalPrice: plan.price,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

module.exports = { createOrder };