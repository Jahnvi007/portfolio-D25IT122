// Global error handler. Must be the LAST middleware registered with app.use().
// Express recognizes it as an error handler because it has 4 parameters.
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose validation errors (required fields missing, enum mismatch, etc.)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: 'Validation Error',
      message: errors.join(', '),
      details: errors
    });
  }

  // Mongoose CastError (e.g. malformed ObjectId reaching a query)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Bad Request',
      message: `Invalid value for field '${err.path}'`
    });
  }

  res.status(500).json({ error: 'Something went wrong' });
}

module.exports = errorHandler;
