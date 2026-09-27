const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requestLogger = require('./middleware/logger');
const requireJson = require('./middleware/requireJson');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const authenticate = require('./middleware/auth');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Import the same cache instance used by taskController
const cache = require('./cache/cache');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Global middleware pipeline ---
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(requireJson);

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/tasks', authenticate, taskRoutes);

// --- 404 handler ---
app.use(notFound);

// --- Global error handler ---
app.use(errorHandler);

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Debug: confirm cache instance is available
    console.log('Cache initialized:', !!cache);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;