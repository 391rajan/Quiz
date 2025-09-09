require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findById('6543b57353f4d7b278f24a1b');
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit();
      return;
    }

    // Create admin user
    const admin = new User({
      _id: '6543b57353f4d7b278f24a1b',
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123' // This will be hashed by the pre-save hook
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
