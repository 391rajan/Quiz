const Subscription = require('../models/Subscription');

// Subscribe to newsletter
const subscribe = async (req, res) => {
  try {
    const { email, source = 'homepage' } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingSubscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (existingSubscription) {
      if (existingSubscription.status === 'unsubscribed') {
        // Reactivate subscription
        existingSubscription.status = 'pending';
        existingSubscription.source = source;
        await existingSubscription.save();
        return res.status(200).json({ 
          message: 'Subscription reactivated successfully',
          email: existingSubscription.email 
        });
      }
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    // Create new subscription
    const subscription = new Subscription({
      email: email.toLowerCase(),
      source,
    });

    await subscription.save();

    res.status(201).json({
      message: 'Subscription successful! Welcome to QuizMaster.',
      email: subscription.email
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get all subscriptions (admin only)
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({})
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unsubscribe from newsletter
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscription = await Subscription.findOne({ email: email.toLowerCase() });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = 'unsubscribed';
    await subscription.save();

    res.status(200).json({ message: 'Successfully unsubscribed' });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get subscription statistics
const getSubscriptionStats = async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments({ status: { $ne: 'unsubscribed' } });
    const pendingSubscriptions = await Subscription.countDocuments({ status: 'pending' });
    const confirmedSubscriptions = await Subscription.countDocuments({ status: 'confirmed' });
    
    const sourceStats = await Subscription.aggregate([
      { $match: { status: { $ne: 'unsubscribed' } } },
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      total: totalSubscriptions,
      pending: pendingSubscriptions,
      confirmed: confirmedSubscriptions,
      bySource: sourceStats
    });

  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  getSubscriptionStats
};




