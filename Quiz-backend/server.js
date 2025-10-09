// File: backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // Import the analytics routes
const subscriptionRoutes = require('./routes/subscriptionRoutes'); // Import the subscription routes
const adminRoutes = require('./routes/adminRoutes'); // Import the admin routes
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount the authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/analytics', analyticsRoutes); // This is where the quizzes route is mounted
app.use('/api/subscriptions', subscriptionRoutes); // Mount subscription routes
app.use('/api/admin', adminRoutes); // Mount admin routes
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Simple root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
const { notFound, errorHandler } = require('./middleware/errorHandler');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));