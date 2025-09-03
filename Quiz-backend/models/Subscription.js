const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'unsubscribed'],
      default: 'pending',
    },
    source: {
      type: String,
      enum: ['homepage', 'plans', 'other'],
      default: 'homepage',
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Add index for email queries
subscriptionSchema.index({ email: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);




