// Global request logging middleware.
// Logs method, URL, and an ISO timestamp for every incoming request.
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}

module.exports = requestLogger;
