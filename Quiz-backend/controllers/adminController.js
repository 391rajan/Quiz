const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Quiz = require('../models/Quiz');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get all quizzes
// @route   GET /api/admin/quizzes
// @access  Private/Admin
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({});
  res.json(quizzes);
});

// @desc    Promote user to admin
// @route   PUT /api/admin/users/:id/promote
// @access  Private/Admin
const promoteUserToAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete a quiz
// @route   DELETE /api/admin/quizzes/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  await quiz.deleteOne();
  res.json({ message: 'Quiz removed successfully' });
});

module.exports = { getAllUsers, getAllQuizzes, promoteUserToAdmin, deleteQuiz };
