// Catches any request that didn't match a defined route.
// Must be registered after all real routes, before the error handler.
function notFound(req, res, next) {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`
  });
}

module.exports = notFound;
