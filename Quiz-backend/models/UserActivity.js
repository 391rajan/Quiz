const mongoose = require('mongoose');

const userActivitySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true,
    enum: ['quiz_start', 'quiz_complete', 'quiz_abandon', 'subscription_change', 'login', 'logout', 'profile_update']
  },
  details: {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    subscriptionPlan: String,
    oldPlan: String,
    newPlan: String,
    ipAddress: String,
    userAgent: String,
    additionalInfo: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
module.exports = UserActivity;