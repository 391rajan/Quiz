const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken'); // Assuming you have this utility

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Auth user with Google
// @route   POST /api/auth/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    throw new Error('Google token is required');
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ email });

  if (user) {
    // User exists, check if they signed up with Google before
    if (!user.googleId) {
      // If not, link their account
      user.googleId = googleId;
      await user.save();
    }
  } else {
    // User does not exist, create a new user
    // We can use the email prefix as a username, ensuring it's unique
    let username = name.replace(/\s/g, '').toLowerCase();
    const userExists = await User.findOne({ username });
    if (userExists) {
      username = `${username}${Date.now()}`; // Append timestamp to ensure uniqueness
    }

    user = await User.create({
      googleId,
      email,
      username,
      // Password is not needed for Google sign-in
    });
  }

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id), // Your app's JWT
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


module.exports = { googleLogin, registerUser, authUser };