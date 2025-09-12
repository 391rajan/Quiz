// File: backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() {
        // Password is required if it's a new user without a googleId
        return !this.googleId && this.isNew;
      }
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true // Allows multiple documents to have a null value for this field
    },
    // This array stores references to QuizAttempt documents
    quizHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizAttempt', // Refers to the QuizAttempt model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook for password hashing (already implemented)
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new) and is not empty
  if (!this.isModified('password') || !this.password) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords (already implemented)
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;