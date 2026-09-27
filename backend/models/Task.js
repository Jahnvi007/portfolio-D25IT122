const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  // Supplementary problem: restrict priority to a fixed set of values.
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'priority must be one of: low, medium, high'
    },
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Supplementary problem: trim whitespace from title before saving.
// (Also covered by `trim: true` above, but kept explicit per the
// practical's requirement — useful if trimming logic ever needs to
// grow more custom, e.g. collapsing internal whitespace.)
taskSchema.pre('save', function (next) {
  if (typeof this.title === 'string') {
    this.title = this.title.trim();
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
