// File: backend/models/Quiz.js

const mongoose = require('mongoose');

// Sub-schema for individual questions
const questionSchema = mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String }, // New field for explanation
  subTopic: { type: String }, // New field for sub-topic
});

const quizSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    questions: [questionSchema], // Array of embedded question objects
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;