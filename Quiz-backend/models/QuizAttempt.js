// File: backend/models/QuizAttempt.js

const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userAnswer: { type: String },
  isCorrect: { type: Boolean, required: true },
  subTopic: { type: String },
});

const quizAttemptSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    answers: [answerSchema],
    dateTaken: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
module.exports = QuizAttempt;