// Rejects POST/PUT requests that do not declare a JSON Content-Type.
// Supplementary problem from the Practical 4 brief.
function requireJson(req, res, next) {
  const needsBody = req.method === 'POST' || req.method === 'PUT';

  if (needsBody && !req.is('application/json')) {
    return res.status(415).json({
      error: 'Unsupported Media Type',
      message: 'Content-Type must be application/json'
    });
  }

  next();
}

module.exports = requireJson;
