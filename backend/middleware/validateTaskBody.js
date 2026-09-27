// Rejects task writes missing a title before they ever reach the
// controller/Mongoose. The Task model also validates `title` on save,
// but doing it here means a malformed request fails fast with a clear
// message instead of relying solely on the schema/errorHandler path.
function validateTaskBody(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Bad Request', message: 'title is required' });
  }

  next();
}

module.exports = validateTaskBody;
