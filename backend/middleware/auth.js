const jwt = require('jsonwebtoken');

// Verifies the "Authorization: Bearer <token>" header and attaches the
// decoded payload to req.user. Wrapped in try/catch so an invalid or
// expired token returns a clean 401 instead of crashing the server.
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticate;
