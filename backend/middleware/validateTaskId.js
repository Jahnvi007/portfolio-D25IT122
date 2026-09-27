const mongoose = require('mongoose');

function validateTaskId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: 'Bad Request',
      message: `Task id '${id}' is not a valid MongoDB ObjectId`
    });
  }

  req.taskId = id;
  next();
}

module.exports = validateTaskId;
