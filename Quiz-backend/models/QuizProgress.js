const mongoose = require('mongoose');

const quizProgressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  currentQuestionIndex: {
    type: Number,
    default: 0
  },
  answers: [{
    questionId: String,
    answer: String,
    timeSpent: Number
  }],
  timeSpent: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  }
}, {
  timestamps: true
});

const QuizProgress = mongoose.model('QuizProgress', quizProgressSchema);
module.exports = QuizProgress;