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
const aiRoutes = require('./routes/aiRoutes');

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
app.use('/api/ai', aiRoutes);

// --- 404 handler ---
app.use(notFound);

// --- Global error handler ---
app.use(errorHandler);

// --- MongoDB connection ---
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      console.log('Cache initialized:', !!cache);

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = app;