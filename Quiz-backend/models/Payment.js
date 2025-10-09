const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['succeeded', 'failed'],
      default: 'failed',
    },
    paymentId: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
